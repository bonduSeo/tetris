export function getInfo() {
  fetch("server/1.text").then((res) => {
    console.log(res.json());
    // return res.json();
  });
}
