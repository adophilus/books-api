// export const sanitanize = (object: Object) =>  {
//     return Object.keys(object).filter(key => !!object[key]).map((key) => )

// }

export const wait = async (delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(null), delay);
  });
};

export function goToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
