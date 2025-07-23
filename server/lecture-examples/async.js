// Function to simulate an asynchronous operation
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Data fetched");
      resolve("Data");
    }, 200); // Simulate a 2-second delay
  });
}

// Main function to demonstrate concurrent execution
async function main() {
  console.log("Starting main function");

  // Start the asynchronous operation
  const dataPromise = fetchData();

  // Continue with synchronous tasks while waiting for the promise
  console.log("Starting synchronous tasks...");
  for (let i = 0; i < 5; i++) {
    console.log(`Synchronous task ${i + 1} completed`);
    // Simulate some work
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  console.log("Synchronous tasks completed");

  // Wait for the promise to resolve and log the result
  const data = await dataPromise;
  console.log(`Received data: ${data}`);
}

main();
