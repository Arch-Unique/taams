const getTitle = (a) => {
  return a.replace(/,/g, "").split(" ").join("");
};

const getExtHost = (req, url) => {
  console.log(req.headers);
  if (!url.startsWith("/")) url = "/" + url;
  return req.headers.origin + url;
};

// const hostname_two = "http://localhost:3003";
// const hostname_three = "http://localhost:3002";

const handleError = (res, err) => {
  console.log(err);
  res.status(404).json({ msg: "error", data: err });
};

const hostname_two = "https://travelwithollie.com";
const hostname_three = "https://admin.montanabenterprise.com";

module.exports = { getTitle, getExtHost, hostname_two, hostname_three };
