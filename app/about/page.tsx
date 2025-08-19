import React from 'react';

export default function AboutPage() {
    return (
 <main className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold mb-4">About</h1>
      <p>Please watch the video below.</p>
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