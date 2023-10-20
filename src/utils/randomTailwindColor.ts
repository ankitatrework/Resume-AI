const randomTailwindColor = () => {
  const colors = [
    "bg-pink-600",
    "bg-purple-600",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-indigo-500",
  ];

  return colors[Math.floor(Math.random() * colors.length)]!;
};

export default randomTailwindColor;
