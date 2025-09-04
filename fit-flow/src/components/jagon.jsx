// src/App.jsx
import React, { useState, useEffect } from "react";

// ---- MuscleDiagram Component ----
export const MuscleDiagram = ({ exercise }) => {
  const en = exercise.translations.find(t => t.language === 2);
  const name = en?.name || "Unnamed Exercise";

  // Separate muscles by view
  const frontMuscles = [
    ...exercise.muscles.filter(m => m.is_front),
    ...exercise.muscles_secondary.filter(m => m.is_front)
  ];
  const backMuscles = [
    ...exercise.muscles.filter(m => !m.is_front),
    ...exercise.muscles_secondary.filter(m => !m.is_front)
  ];

  return (
    <div className="bg-gray-900 text-white p-5 rounded-xl max-w-2xl mx-auto font-sans">
      <h3 className="text-xl font-bold mb-4">{name}</h3>

      {/* Legend */}
      <div className="flex justify-center space-x-6 mb-5 text-sm">
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
          <span>Primary</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
          <span>Secondary</span>
        </div>
      </div>

      {/* Body Diagrams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Front View */}
        {frontMuscles.length > 0 && (
          <div className="relative">
            <h4 className="text-center text-sm text-blue-300 mb-2">Front</h4>
            <div className="relative w-48 h-96 mx-auto border border-gray-600 rounded overflow-hidden bg-gray-200">
              {/* Base Body */}
              <img
                src="https://wger.de/static/images/muscles/muscular_system_front.svg"
                alt="Front body"
                className="absolute inset-0 w-full h-full object-contain"
              />
              {/* Overlay Muscles */}
              {frontMuscles.map(muscle => (
                <img
                  key={muscle.id}
                  src={`https://wger.de${muscle.image_url_main}`}
                  alt={muscle.name}
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                  style={{
                    opacity: exercise.muscles.find(m => m.id === muscle.id) ? 0.7 : 0.5,
                    filter: 'brightness(1.2)',
                    transform: 'scale(0.95)',
                    mixBlendMode: 'multiply',
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Back View */}
        {backMuscles.length > 0 && (
          <div className="relative">
            <h4 className="text-center text-sm text-red-300 mb-2">Back</h4>
            <div className="relative w-48 h-96 mx-auto border border-gray-600 rounded overflow-hidden bg-gray-200">
              {/* Base Body */}
              <img
                src="https://wger.de/static/images/muscles/muscular_system_back.svg"
                alt="Back body"
                className="absolute inset-0 w-full h-full object-contain"
              />
              {/* Overlay Muscles */}
              {backMuscles.map(muscle => (
                <img
                  key={muscle.id}
                  src={`https://wger.de${muscle.image_url_main}`}
                  alt={muscle.name}
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                  style={{
                    opacity: exercise.muscles.find(m => m.id === muscle.id) ? 0.7 : 0.5,
                    filter: 'brightness(1.2)',
                    transform: 'scale(0.95)',
                    mixBlendMode: 'multiply',
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Muscle List */}
      <div className="mt-6 space-y-2 text-sm">
        <p>
          <strong className="text-red-400">Primary:</strong>{' '}
          {exercise.muscles.length > 0 ? (
            exercise.muscles.map(m => m.name).join(', ')
          ) : (
            <span className="text-gray-400">None</span>
          )}
        </p>
        <p>
          <strong className="text-orange-400">Secondary:</strong>{' '}
          {exercise.muscles_secondary.length > 0 ? (
            exercise.muscles_secondary.map(m => m.name).join(', ')
          ) : (
            <span className="text-gray-400">None</span>
          )}
        </p>
      </div>

      {/* License */}
      <p className="text-xs text-gray-400 mt-4 text-center">
        Data & images: <a href="https://wger.de" className="text-blue-400">wger.de</a> (
        <a
          href={exercise.license.url.trim()}
          className="text-blue-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          {exercise.license.short_name}
        </a>
        )
      </p>
    </div>
  );
};

// ---- ExerciseCard Component ----
export const ExerciseCard = ({ exercise }) => {
  const en = exercise.translations.find(t => t.language === 2);
  const name = en?.name || "Unnamed Exercise";
  const description = en?.description || "No description provided.";

  const youtubeQuery = encodeURIComponent(`${name} exercise`);
  const tiktokQuery = encodeURIComponent(name);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600">
          <strong>Category:</strong> {exercise.category.name}
        </p>
      </div>

      {/* Muscle Diagram */}
      {(exercise.muscles.length > 0 || exercise.muscles_secondary.length > 0) && (
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Muscles Worked</h3>
          <MuscleDiagram exercise={exercise} />
        </div>
      )}

      {/* Equipment */}
      {exercise.equipment.length > 0 && (
        <div className="px-4 py-2 bg-gray-50 border-t">
          <p className="text-sm">
            <strong>Equipment:</strong>{" "}
            {exercise.equipment.map(e => e.name).join(", ")}
          </p>
        </div>
      )}

      {/* Description */}
      <div className="p-4 border-t">
        <div
          className="text-gray-700 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>

      {/* Exercise Image */}
      {exercise.images.length > 0 && (
        <div className="p-4 border-t">
          <img
            src={exercise.images[0].image}
            alt={name}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}

      {/* Video (if exists) */}
      {exercise.videos.length > 0 && (
        <div className="p-4 border-t">
          <video controls className="w-full rounded-lg">
            <source src={exercise.videos[0].video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* External Links */}
      <div className="p-4 border-t bg-gray-50 space-y-2">
        <a
          href={`https://www.youtube.com/results?search_query=${youtubeQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
        >
          🔍 Watch on YouTube
        </a>
        <a
          href={`https://www.tiktok.com/search?q=${tiktokQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center py-2 bg-black text-white rounded text-sm hover:bg-gray-800 transition"
        >
          🎵 Search on TikTok
        </a>
      </div>

      {/* License */}
      <div className="p-3 bg-gray-100 border-t">
        <p className="text-xs text-gray-600">
          <strong>Licensed under {exercise.license.short_name}</strong>{" "}
          by {exercise.license_author || "Unknown"}.
          <br />
          <a
            href={exercise.license.url?.trim() || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View License
          </a>
        </p>
      </div>
    </div>
  );
};

// ---- App Component ----
const App = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAllExercises = async () => {
      let allExercises = [];
      let url = "https://wger.de/api/v2/exerciseinfo/?language=2&limit=200";

      try {
        while (url) {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const data = await res.json();
          allExercises = [...allExercises, ...data.results];
          url = data.next;
        }
        setExercises(allExercises);
      } catch (error) {
        console.error("Failed to fetch exercises:", error);
        alert("Could not load exercises. Check your internet connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllExercises();
  }, []);

  const filtered = exercises.filter((ex) =>
    ex.translations
      .find((t) => t.language === 2)
      ?.name.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 shadow">
        <h1 className="text-3xl font-bold">Exercise Library</h1>
        <p className="opacity-90">Powered by wger.de (CC-BY-SA)</p>
      </header>

      {/* Search */}
      <div className="p-4 bg-white shadow">
        <input
          type="text"
          placeholder="Search exercises..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl mx-auto p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center p-10">
          <div className="animate-spin w-10 h-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      )}

      {/* Grid */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filtered.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>

      {/* No Results */}
      {!loading && filtered.length === 0 && (
        <p className="text-center py-10 text-gray-500">
          No exercises found matching "{search}"
        </p>
      )}
    </div>
  );
};

export default App;