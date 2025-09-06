// src/pages/ExerciseDetail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import useExerciseStore from "../stores/exerciseStore";
import NavBar from "./NavBar";

const DetailsPage = () => {
  const { id } = useParams();
  const exercise = useExerciseStore((s) =>
    s.exercises.find((ex) => ex.id === parseInt(id))
  );

  if (!exercise) {
    return (
      <div className="p-10 text-center text-gray-600">
        Exercise not found.{" "}
        <Link to="/" className="text-blue-500 hover:underline">Back</Link>
      </div>
    );
  }

  const en = exercise.translations.find((t) => t.language === 2);
  const name = en?.name || "Unnamed Exercise";
  const description = en?.description || "No description available.";

  const youtubeQuery = encodeURIComponent(`${name} exercise`);
  const tiktokQuery = encodeURIComponent(name);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Back */}
      <NavBar />

      {/* Title & Category */}
      <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
      <p className="text-gray-600">
        <strong>Category:</strong> {exercise.category?.name || "Uncategorized"}
      </p>

      {/* Equipment */}
      {exercise.equipment?.length > 0 && (
        <p className="text-gray-700">
          <strong>Equipment:</strong> {exercise.equipment.map((e) => e.name).join(", ")}
        </p>
      )}

      {/* Muscles */}
      {(exercise.muscles?.length > 0 || exercise.muscles_secondary?.length > 0) && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Front */}
          <div className="relative">
            <img
              src="https://wger.de/static/images/muscles/muscular_system_front.svg"
              alt="Front muscles"
              className="w-full"
            />
            {exercise.muscles?.map((m) => (
              <img
                key={m.id}
                src={`https://wger.de${m.image_url_main}`}
                alt={m.name}
                className="absolute inset-0 w-full opacity-70"
              />
            ))}
            {exercise.muscles_secondary?.map((m) => (
              <img
                key={m.id}
                src={`https://wger.de${m.image_url_secondary}`}
                alt={m.name}
                className="absolute inset-0 w-full opacity-40"
              />
            ))}
          </div>

          {/* Back */}
          <div className="relative">
            <img
              src="https://wger.de/static/images/muscles/muscular_system_back.svg"
              alt="Back muscles"
              className="w-full"
            />
            {exercise.muscles?.map((m) => (
              <img
                key={m.id}
                src={`https://wger.de${m.image_url_main}`}
                alt={m.name}
                className="absolute inset-0 w-full opacity-70"
              />
            ))}
            {exercise.muscles_secondary?.map((m) => (
              <img
                key={m.id}
                src={`https://wger.de${m.image_url_secondary}`}
                alt={m.name}
                className="absolute inset-0 w-full opacity-40"
              />
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      <div
        className="prose max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: description }}
      />

      {/* Images */}
      {exercise.images?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {exercise.images.map((img) => (
            <img
              key={img.id}
              src={img.image}
              alt={name}
              className="rounded-lg shadow"
            />
          ))}
        </div>
      )}

      {/* Video */}
      {exercise.videos?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Video</h3>
          <video controls className="w-full rounded-lg">
            <source src={exercise.videos[0].video} type="video/mp4" />
          </video>
        </div>
      )}

      {/* External Links */}
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href={`https://www.youtube.com/results?search_query=${youtubeQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          🔍 Watch on YouTube
        </a>
        <a
          href={`https://www.tiktok.com/search?q=${tiktokQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          🎵 Search on TikTok
        </a>
      </div>
    </div>
  );
};

export default DetailsPage;
