import {useState} from 'react';

export const PokemonCard = ({
  name,
  imageSrc,
  trainingMode,
}: {
  name: string;
  imageSrc: string;
  trainingMode: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 border ${
        isHovered ? 'shadow-2xl scale-105 rotate-1 border-blue-200' : 'border-transparent'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid="pokemon-card"
      data-hovered={isHovered}
    >
      <div className="p-4 bg-gray-100 flex justify-center">
        {trainingMode ? (
          <>
            <img
              src={imageSrc}
              alt={name}
              className={`absolute h-32 w-32 object-contain transition-transform duration-300 ${
                isHovered ? 'opacity-100 scale-110' : 'opacity-0'
              }`}
            />
            <div className="relative h-32 w-32 flex items-center justify-center">
              <img
                src={imageSrc}
                alt="Pokemon silhouette"
                className={`h-32 w-32 object-contain brightness-0 contrast-200 transition-opacity duration-300 ${
                  isHovered ? 'opacity-0' : 'opacity-50'
                }`}
              />
            </div>
          </>
        ) : (
          <img
            src={imageSrc}
            alt={name}
            className={`h-32 w-32 object-contain transition-transform duration-300 ${
              isHovered ? 'scale-110' : ''
            }`}
          />
        )}
      </div>
      <div
        className={`p-4 bg-gradient-to-r transition-colors duration-300 ${
          isHovered ? 'from-blue-50 to-white' : 'from-white to-white'
        }`}
      >
        <h2
          className={`text-xl font-semibold text-center transition-all duration-300 ${
            isHovered ? 'text-blue-600' : ''
          }`}
        >
          {trainingMode ? (
            <span className="inline-block transition-all duration-300">
              {isHovered ? name : '?'}
            </span>
          ) : (
            name
          )}
        </h2>
      </div>
    </div>
  );
};
