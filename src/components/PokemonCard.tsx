export const PokemonCard = ({
  name,
  imageSrc,
  trainingMode,
}: {
  name: string;
  imageSrc: string;
  trainingMode: boolean;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:rotate-1 border border-transparent hover:border-blue-200 group">
      <div className="p-4 bg-gray-100 flex justify-center">
        {trainingMode ? (
          <>
            <img
              src={imageSrc}
              alt={name}
              className="absolute h-32 w-32 object-contain transition-transform duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-110"
            />
            <div className="relative h-32 w-32 flex items-center justify-center">
              <img
                src={imageSrc}
                alt="Pokemon silhouette"
                className="h-32 w-32 object-contain brightness-0 contrast-200 opacity-50 transition-opacity duration-300 group-hover:opacity-0"
              />
            </div>
          </>
        ) : (
          <img
            src={imageSrc}
            alt={name}
            className="h-32 w-32 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        )}
      </div>
      <div className="p-4 bg-gradient-to-r from-white to-white hover:from-blue-50 hover:to-white transition-colors duration-300">
        <h2
          className={`text-xl font-semibold text-center transition-all duration-300 ${
            trainingMode ? 'group-hover:text-blue-600' : 'group-hover:text-blue-600'
          }`}
        >
          {trainingMode ? (
            <span className="inline-block transition-all duration-300">
              <span className="group-hover:hidden">?</span>
              <span className="hidden group-hover:inline">{name}</span>
            </span>
          ) : (
            name
          )}
        </h2>
      </div>
    </div>
  );
};
