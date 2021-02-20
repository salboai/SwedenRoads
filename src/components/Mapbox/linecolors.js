const palette = [
  1,
  "#C40A3B",
  2,
  "#F2203E",
  3,
  "#FABF20",
  4,
  "#71C94B",
  5,
  "#20AC65",
  "#ccc", //others
];

//they all use the same colors, but determined by different variables
const linecolors = {
  IndxKls: ["match", ["get", "IndxKls"], ...palette],
  IndK2030: ["match", ["get", "IndK2030"], ...palette],
  IKls_2: ["match", ["get", "IKls_2"], ...palette],
  IKls_3: ["match", ["get", "IKls_3"], ...palette],
};

export default linecolors;
