
const matches = [
  { id: 1, title: "Match Prediction", date: "Sat 16 June", location: "Town's Garden" },
  { id: 2, title: "Soccer Anthem", date: "Sat 16 June", location: "Town's Garden" },
];

const UpcomingMatches = () => {
  return (
    <div className="bg-white p-4 shadow-md border border-gray-300 rounded-lg">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Matches</h2>
      <div className="space-y-3">
        {matches.map((match) => (
          <div key={match.id} className="text-gray-700">
            <p className="font-medium">{match.title}</p>
            <p className="text-sm">{match.date} - {match.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMatches;
