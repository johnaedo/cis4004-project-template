import express from 'express';
import { pool } from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all budgets for a user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [results] = await pool.query(
      `SELECT b.*, c.name as category_name, c.type as category_type, c.color as category_color 
       FROM budgets b 
       LEFT JOIN budget_categories c ON b.category_id = c.id 
       WHERE b.user_id = ?`,
      [req.user.id]
    );
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get budget summary
router.get('/summary', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const [results] = await pool.query(
      `SELECT 
         c.type,
         SUM(b.amount) as total_budget,
         COUNT(*) as budget_count
       FROM budgets b
       LEFT JOIN budget_categories c ON b.category_id = c.id
       WHERE b.user_id = ? 
         AND b.start_date <= ? 
         AND b.end_date >= ?
       GROUP BY c.type`,
      [req.user.id, endDate, startDate]
    );
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new budget
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { category_id, amount, start_date, end_date } = req.body;
    const [result] = await pool.query(
      'INSERT INTO budgets (user_id, category_id, amount, start_date, end_date) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, category_id, amount, start_date, end_date]
    );
    
    const [newBudget] = await pool.query(
      `SELECT b.*, c.name as category_name, c.type as category_type, c.color as category_color 
       FROM budgets b 
       LEFT JOIN budget_categories c ON b.category_id = c.id 
       WHERE b.id = ?`,
      [result.insertId]
    );
    
    res.status(201).json(newBudget[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a budget
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { category_id, amount, start_date, end_date } = req.body;
    await pool.query(
      'UPDATE budgets SET category_id = ?, amount = ?, start_date = ?, end_date = ? WHERE id = ? AND user_id = ?',
      [category_id, amount, start_date, end_date, req.params.id, req.user.id]
    );
    
    const [updatedBudget] = await pool.query(
      `SELECT b.*, c.name as category_name, c.type as category_type, c.color as category_color 
       FROM budgets b 
       LEFT JOIN budget_categories c ON b.category_id = c.id 
       WHERE b.id = ?`,
      [req.params.id]
    );
    
    if (!updatedBudget.length) {
      return res.status(404).json({ error: "Budget not found" });
    }
    
    res.json(updatedBudget[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a budget
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const [budget] = await pool.query(
      `SELECT b.*, c.name as category_name, c.type as category_type, c.color as category_color 
       FROM budgets b 
       LEFT JOIN budget_categories c ON b.category_id = c.id 
       WHERE b.id = ? AND b.user_id = ?`,
      [req.params.id, req.user.id]
    );
    
    if (!budget.length) {
      return res.status(404).json({ error: "Budget not found" });
    }
    
    await pool.query(
      'DELETE FROM budgets WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    
    res.json(budget[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router; 