import React from 'react';
import { useFavorites } from '../context/FavoritesContext';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">❤️ Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {favorites.map((item: any) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow">
              <img src={item.image} className="h-32 w-full object-cover rounded" />
              <h2 className="font-bold">{item.name}</h2>
              <p className="text-orange-600">₹{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};