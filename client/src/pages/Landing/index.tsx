import Navbar from "../../components/Navbar";
import pizzaLogo from "../../assets/pizzaLogo.png";
import { Link } from "react-router-dom";

const Landing: React.FC = () => {
  return (
    <>
      <Navbar />
      <header className="flex h-40 w-full bg-orange-100 px-2">
        <div className="flex h-full w-1/2 space-x-2">
          <img
            src={pizzaLogo}
            alt="logo"
            className="left -1/2-translate-x-1/2 h-32 w-32 transform self-center"
          />
          <h1 className="flex items-center justify-center bg-orange-100 font-primary text-3xl text-teal-900">
            SPAM PIZZA
          </h1>
        </div>
      </header>
      <main className="h-76 flex h-full w-full flex-wrap justify-center gap-8 bg-orange-100 pb-40">
        <article className="flex h-64 w-64 flex-col items-center justify-center gap-4 rounded-3xl bg-orange-50 shadow-lg">
          <Link to="/updatemenu">
            <svg
              version="1.1"
              id="Layer_1"
              height="125px"
              width="125px"
              className="pl-4"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  style={{ fill: "#134E4A" }}
                  d="M492.868,100.398c16.3,16.3,16.3,42.833,0,59.134l-82.775,82.775v242.665 c0,14.904-12.123,27.027-27.015,27.027H33.934c-14.904,0-27.027-12.123-27.027-27.027V114.733c0-3.275,1.298-6.426,3.621-8.737 L112.903,3.621C115.214,1.298,118.365,0,121.64,0h261.438c14.892,0,27.015,12.123,27.015,27.027v67.921l9.096-9.096 c16.3-16.3,42.833-16.3,59.134,0L492.868,100.398z M475.381,142.057c6.673-6.673,6.673-17.512,0-24.185l-14.533-14.533 c-6.673-6.673-17.512-6.673-24.185,0l-15.571,15.571l38.718,38.718L475.381,142.057z M244.691,372.748l197.645-197.645 l-38.718-38.718L205.972,334.03L244.691,372.748z M303.763,201.278l82.133-82.133c-0.346-1.112-0.519-2.299-0.519-3.522V27.027 c0-1.273-1.026-2.311-2.299-2.311H133.998v75.36c0,14.892-12.123,27.015-27.015,27.015h-75.36v357.881 c0,1.273,1.038,2.311,2.311,2.311h349.144c1.273,0,2.299-1.038,2.299-2.311V267.024L253.428,398.972 c-1.508,1.508-3.386,2.595-5.438,3.164c0,0-77.931,21.627-77.993,21.639c-0.395,0.111-3.102,0.408-3.114,0.408H103.56 c-6.822,0-12.358-5.524-12.358-12.358c0-6.822,5.536-12.358,12.358-12.358h53.931l19.093-68.736c0.568-2.064,1.656-3.93,3.164-5.438 l0.198-0.198H103.56c-6.822,0-12.358-5.536-12.358-12.358c0-6.822,5.536-12.358,12.358-12.358h101.102l74.384-74.384H103.56 c-6.822,0-12.358-5.524-12.358-12.358c0-6.822,5.536-12.358,12.358-12.358H303.763z M184.642,394.078l36.333-10.084l-26.249-26.249 L184.642,394.078z M109.282,100.077V42.203L49.11,102.375h57.873C108.256,102.375,109.282,101.35,109.282,100.077z"
                ></path>{" "}
                <path
                  style={{ fill: "#FFF7ED" }}
                  d="M475.381,117.872c6.673,6.673,6.673,17.512,0,24.185l-15.571,15.571l-38.718-38.718l15.571-15.571 c6.673-6.673,17.512-6.673,24.185,0L475.381,117.872z"
                ></path>{" "}
                <rect
                  x="184.398"
                  y="227.195"
                  transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 733.3798 205.3737)"
                  style={{ fill: "#FFF7ED" }}
                  width="279.515"
                  height="54.759"
                ></rect>{" "}
                <path
                  style={{ fill: "#FFF7ED" }}
                  d="M385.895,119.145l-82.133,82.133H103.56c-6.822,0-12.358,5.536-12.358,12.358 c0,6.834,5.536,12.358,12.358,12.358h175.486l-74.384,74.384H103.56c-6.822,0-12.358,5.536-12.358,12.358 c0,6.822,5.536,12.358,12.358,12.358h76.386l-0.198,0.198c-1.508,1.508-2.595,3.374-3.164,5.438l-19.093,68.736H103.56 c-6.822,0-12.358,5.536-12.358,12.358c0,6.834,5.536,12.358,12.358,12.358h63.323c0.012,0,2.719-0.297,3.114-0.408 c0.062-0.012,77.993-21.639,77.993-21.639c2.051-0.568,3.93-1.656,5.438-3.164l131.948-131.948v217.949 c0,1.273-1.026,2.311-2.299,2.311H33.934c-1.273,0-2.311-1.038-2.311-2.311V127.092h75.36c14.892,0,27.015-12.123,27.015-27.015 v-75.36h249.079c1.273,0,2.299,1.038,2.299,2.311v88.596C385.376,116.847,385.549,118.033,385.895,119.145z"
                ></path>{" "}
                <polygon
                  style={{ fill: "#FFF7ED" }}
                  points="220.975,383.994 184.642,394.078 194.727,357.745 "
                ></polygon>{" "}
                <path
                  style={{ fill: "#FFF7ED" }}
                  d="M109.282,42.203v57.873c0,1.273-1.026,2.299-2.299,2.299H49.11L109.282,42.203z"
                ></path>{" "}
              </g>
            </svg>
          </Link>
          <Link to="/updatemenu">
            <h3 className="flex items-center justify-center font-primary text-2xl text-teal-900">
              Ändra meny
            </h3>
          </Link>
        </article>
        <article className="flex h-64 w-64 flex-col items-center justify-center gap-2 rounded-3xl bg-orange-50 shadow-lg">
          <Link to="/stock">
            <svg
              fill="#134E4A"
              height="125px"
              width="125px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 470 470"
              xmlSpace="preserve"
              stroke="#134E4A"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <path d="M462.5,270.58c-4.142,0-7.5,3.358-7.5,7.5v22.5H15v-22.5c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v183.137 c0,4.142,3.358,7.5,7.5,7.5h455c4.142,0,7.5-3.358,7.5-7.5V278.08C470,273.938,466.642,270.58,462.5,270.58z M455,330.58H67.5 c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5H455v108.137H15V345.58h22.5c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5H15v-15 h440V330.58z"></path>{" "}
                  <path d="M189.28,283.891c1.393,1.137,3.07,1.69,4.738,1.69c2.175,0,4.332-0.941,5.814-2.757l83.154-101.865 c2.619-3.208,2.142-7.933-1.067-10.553c-3.208-2.619-7.933-2.142-10.553,1.067l-83.154,101.865 C185.594,276.546,186.071,281.271,189.28,283.891z"></path>{" "}
                  <path d="M226.213,273.338c-2.619,3.208-2.142,7.933,1.067,10.553c1.393,1.137,3.07,1.69,4.738,1.69 c2.175,0,4.332-0.941,5.814-2.757c0,0,81.987-100.437,83.139-101.847c0.004-0.006,0.009-0.011,0.014-0.017 c0.462-0.566,0.958-1.114,1.472-1.629c8.355-8.354,21.95-8.354,30.305,0l20.679,20.679c8.355,8.355,8.355,21.95,0,30.306 c-0.515,0.515-1.063,1.01-1.627,1.471l-49.594,40.484c-3.209,2.62-3.687,7.344-1.067,10.553c1.483,1.816,3.64,2.757,5.814,2.757 c1.667,0,3.346-0.553,4.738-1.69l49.595-40.485c0.954-0.779,1.878-1.615,2.747-2.484c12.334-12.335,13.951-31.384,4.863-45.486 c20.311-18.05,46.189-27.922,73.589-27.922c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5c-30.352,0-59.063,10.668-81.858,30.223 l63.241-63.24c2.929-2.929,2.929-7.677,0-10.606c-2.929-2.929-7.678-2.929-10.606,0l-63.236,63.236 c19.553-22.795,30.219-51.503,30.219-81.853c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5c0,27.399-9.872,53.278-27.922,73.589 c-14.102-9.089-33.152-7.472-45.486,4.862c-0.869,0.869-1.705,1.793-2.484,2.747l0.019,0.015c-0.335,0.374-0.648,0.757-0.953,1.13 L226.213,273.338z"></path>{" "}
                  <path d="M37.477,285.58c4.142,0,7.5-3.358,7.5-7.5V96.334h106.47V278.08c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5V91.235 l28.212-39.54l21.148,29.638H195.8c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h27.071v89.779c0,4.142,3.358,7.5,7.5,7.5 s7.5-3.358,7.5-7.5V88.834c0-1.562-0.488-3.085-1.395-4.356l-34.317-48.096V8.783c0-4.142-3.358-7.5-7.5-7.5H73.189 c-4.142,0-7.5,3.358-7.5,7.5v27.598L31.371,84.478c-0.907,1.271-1.395,2.794-1.395,4.356V278.08 C29.977,282.222,33.334,285.58,37.477,285.58z M80.689,16.283h106.47v15H80.689V16.283z M77.051,46.283h103.043l-25.01,35.051 H52.041L77.051,46.283z"></path>{" "}
                  <path d="M432.5,285.581c4.142,0,7.5-3.358,7.5-7.5v-12.462c0-15.596-9.857-29.732-24.528-35.176c-3.885-1.44-8.2,0.539-9.641,4.422 c-1.441,3.884,0.539,8.2,4.422,9.641c8.82,3.273,14.747,11.757,14.747,21.113v12.462C425,282.223,428.358,285.581,432.5,285.581z"></path>{" "}
                </g>{" "}
              </g>
            </svg>
          </Link>
          <Link to="/stock">
            <h3 className="flex items-center justify-center font-primary text-2xl text-teal-900">
              Lagerstatus
            </h3>
          </Link>
        </article>
        <article className="flex h-64 w-64 flex-col items-center justify-center gap-2 rounded-3xl bg-orange-50 shadow-lg">
          <Link to="/orders">
            <svg
              height="125px"
              width="125px"
              viewBox="0 -2 1028 1028"
              fill="#134E4A"
              className="icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M91.448447 896c-50.086957 0-91.428571-40.546584-91.428571-91.428571V91.428571C0.019876 41.341615 40.56646 0 91.448447 0h671.006211c50.086957 0 91.428571 40.546584 91.428572 91.428571v337.093168l-3.180124-0.795031c-13.515528-3.975155-26.236025-5.565217-40.546584-5.565217h-0.795031l-0.795031-2.385093h-2.385094V91.428571c0-23.055901-20.670807-43.726708-43.726708-43.726708H91.448447c-23.055901 0-43.726708 20.670807-43.726708 43.726708v713.142858c0 23.055901 20.670807 43.726708 43.726708 43.726708h352.198758l0.795031 0.795031c8.745342 11.925466 3.975155 20.670807 0.795031 27.031056-3.180124 5.565217-4.770186 9.540373 0.795031 15.10559l4.770186 4.770186H91.448447z"
                  fill=""
                ></path>
                <path
                  d="M143.125466 174.906832c-8.745342 0-15.900621-11.130435-15.900621-24.645962 0-13.515528 7.15528-24.645963 15.900621-24.645963h270.310559c8.745342 0 15.900621 11.130435 15.900621 24.645963 0 13.515528-7.15528 24.645963-15.900621 24.645962h-270.310559z"
                  fill=""
                ></path>
                <path
                  d="M413.436025 128h-270.310559c-7.15528 0-13.515528 9.540373-13.515528 22.26087s6.360248 22.26087 13.515528 22.260869h270.310559c7.15528 0 13.515528-9.540373 13.515528-22.260869s-5.565217-22.26087-13.515528-22.26087zM139.945342 302.111801c-7.15528 0-12.720497-10.335404-12.720497-24.645962s5.565217-24.645963 12.720497-24.645963h193.987577c7.15528 0 12.720497 10.335404 12.720497 24.645963s-5.565217 24.645963-12.720497 24.645962H139.945342z"
                  fill=""
                ></path>
                <path
                  d="M333.932919 255.204969H139.945342c-5.565217 0-9.540373 9.540373-9.540373 22.26087s3.975155 22.26087 9.540373 22.260869h193.987577c5.565217 0 9.540373-9.540373 9.540373-22.260869s-4.770186-22.26087-9.540373-22.26087zM734.628571 1024c-27.826087 0-58.037267-1.590062-96.993788-4.770186-56.447205-4.770186-108.124224-31.006211-158.211181-79.503106L253.634783 718.708075c-52.47205-50.881988-54.857143-117.664596-7.950311-168.546584 19.875776-20.670807 50.881988-33.391304 84.273292-33.391305 33.391304 0 63.602484 12.720497 82.68323 34.981367 0.795031 0.795031 2.385093 2.385093 5.565217 3.975155 0.795031 0.795031 2.385093 1.590062 3.180124 2.385093V451.57764v-52.47205c0-40.546584 0-81.888199 0.795031-122.434783 0.795031-60.42236 47.701863-106.534161 109.714286-106.534161h0.795031c59.627329 0 104.944099 43.726708 108.124224 103.354037 0.795031 13.515528 0.795031 27.826087 0 42.136646v18.285714h11.925466c41.341615 0 73.142857 14.310559 96.198757 44.52174 0.795031 1.590062 5.565217 3.180124 11.925466 3.180124 2.385093 0 4.770186 0 6.360249-0.795031 7.15528-0.795031 14.310559-1.590062 20.670807-1.590062 31.801242 0 59.627329 12.720497 83.478261 38.956521 3.975155 3.975155 12.720497 7.15528 20.670807 7.15528h3.180125c5.565217-0.795031 11.925466-1.590062 17.490683-1.590062 59.627329 0 107.329193 42.136646 108.124224 96.993789 2.385093 100.968944 3.975155 200.347826-7.15528 298.931677-13.515528 119.254658-77.118012 182.857143-201.142857 198.757764-23.055901 3.975155-49.291925 5.565217-77.913044 5.565217zM325.982609 562.086957c-16.695652 0-32.596273 6.360248-44.521739 17.490683-14.310559 14.310559-22.26087 31.006211-22.26087 49.291925 0 19.080745 8.745342 38.161491 24.645963 54.062112l30.21118 30.21118c65.987578 65.192547 134.360248 131.975155 202.732919 197.962733 33.391304 31.801242 71.552795 52.47205 113.689441 60.42236 32.596273 6.360248 65.192547 9.540373 96.993789 9.540373 28.621118 0 57.242236-2.385093 85.068323-7.950311 100.968944-18.285714 147.080745-66.782609 156.621118-160.596273 8.745342-89.838509 7.950311-182.062112 6.360248-271.10559v-14.310559c-0.795031-32.596273-23.850932-54.857143-56.447205-54.857143-8.745342 0-16.695652 1.590062-25.440993 4.770187V601.043478c0 11.130435 0 32.596273-22.26087 32.596274h-0.795031c-7.15528 0-12.720497-1.590062-15.900621-5.565218-6.360248-6.360248-7.15528-18.285714-7.15528-27.826087v-4.770186c0-36.571429 0.795031-73.937888 0-111.304348-0.795031-32.596273-23.850932-55.652174-55.652174-55.652174-7.950311 0-15.900621 1.590062-23.0559 3.975155v128.795031c0 11.130435-2.385093 19.875776-7.950311 25.440994-3.975155 3.975155-9.540373 6.360248-16.695652 6.360249h-0.795031c-21.465839-0.795031-21.465839-23.055901-21.465838-31.006211v-52.47205-66.782609c0-15.10559-6.360248-31.006211-18.285715-42.931677-11.130435-11.130435-26.236025-17.490683-41.341615-17.490683-6.360248 0-13.515528 0.795031-19.875776 3.180124V442.832298c0 27.031056 0 55.652174-1.590062 83.478261-0.795031 7.15528-7.15528 12.720497-13.515528 18.285714-2.385093 2.385093-5.565217 4.770186-7.950311 7.15528l-2.385093 2.385093-1.590062-3.975155c-1.590062-2.385093-3.975155-4.770186-6.360248-6.360249-4.770186-5.565217-10.335404-11.130435-13.515528-17.490683-2.385093-4.770186-1.590062-10.335404-1.590062-15.10559v-6.360249-69.167701c0-50.881988 0-103.354037-0.795032-155.031056 0-38.161491-24.645963-63.602484-60.42236-64.397516-38.956522 0-65.192547 27.826087-65.192546 68.372671v374.459627l-10.335404 6.360249-0.795031-1.590062c-7.15528-7.950311-15.10559-15.900621-22.26087-23.850932-16.695652-17.490683-34.186335-36.571429-51.677018-54.062112-15.900621-15.10559-35.776398-23.850932-56.447205-23.850931z"
                  fill=""
                ></path>
              </g>
            </svg>
          </Link>
          <Link to="/orders">
            <h3 className="flex items-center justify-center font-primary text-2xl text-teal-900">
              Beställningar
            </h3>
          </Link>
        </article>
      </main>
    </>
  );
};

export default Landing;
