import React from 'react';

export default function AboutPage() {
    return (
 <main className="flex flex-col items-center justify-center min-h-screen text-center bg-white dark:bg-gray-900 transition-colors duration-200">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">About</h1>
      <p className="text-gray-700 dark:text-gray-300">Please watch the video below.</p>
            <video
        className="mt-6 rounded shadow-lg"
        width="480"
        controls
      >
        <source src="null" type="null" />
      </video>
    </main>
    );
}