import React from 'react';

const Hour24 = ({
  direction,
  ...props
}) => (
    <svg data-testid="hour24" className="Hour24" width="1em" height="1em" viewBox="0 0 612.001 612.001" {...props}>
      {direction === 'next' ? (
        <g id='next-day-icon'>
          <path d="M201.582,398.487c0-57.43,74.473-66.617,74.473-98.255c0-13.901-10.759-22.212-24.221-22.212
		c-18.613,0-28.715,18.851-28.715,18.851l-21.536-14.357c0,0,14.576-31.857,52.717-31.857c28.039,0,51.822,17.042,51.822,47.109
		c0,51.147-71.331,59.896-72.007,89.962h74.473v24.897H202.934C202.258,407.475,201.582,402.981,201.582,398.487z M324.809,353.845
		l68.646-100.503h34.322v94.219h20.642v24.021h-20.642v41.045h-28.495v-41.045h-74.473V353.845L324.809,353.845z M399.281,347.561
		v-49.337c0-7.854,1.132-16.604,1.132-16.604h-0.457c0,0-3.58,8.512-7.854,14.576l-36.789,50.927v0.438H399.281L399.281,347.561z
    M539.777,339.118l-5.543,19.855C502.727,471.835,387.76,543.053,274.033,514.826C164.799,487.716,96.911,381.87,113.235,274.033
		l32.914,9.188c7.629,2.13,14.704-4.798,12.733-12.471L123.088,131.37c-1.97-7.672-11.506-10.334-17.166-4.792L3.097,227.26
		c-5.66,5.542-3.198,15.134,4.433,17.264l35.826,10.001C16.62,400.396,106.611,545.678,253.463,583.919
		c152.489,39.71,308.024-54.678,350.394-206.45l5.299-18.982c1.528-5.474-1.67-11.149-7.144-12.678l-49.557-13.835
		C546.981,330.445,541.305,333.645,539.777,339.118z M598.336,252.268l-51.97,6.752c-5.636,0.732-9.61,5.894-8.879,11.53
		l2.048,15.762c0.732,5.636,5.895,9.611,11.53,8.878l51.97-6.752c5.636-0.732,9.61-5.894,8.879-11.53l-2.049-15.762
		C609.134,255.511,603.972,251.536,598.336,252.268z M558.328,154.064l-45.655,25.729c-4.951,2.79-6.703,9.065-3.913,14.017
		l7.803,13.847c2.79,4.951,9.065,6.703,14.017,3.913l45.655-25.729c4.951-2.79,6.703-9.065,3.913-14.017l-7.803-13.847
		C569.555,153.026,563.279,151.274,558.328,154.064z M484.447,77.998l-32.694,40.958c-3.546,4.441-2.818,10.917,1.623,14.461
		l12.423,9.916c4.441,3.546,10.916,2.819,14.461-1.623l32.694-40.958c3.546-4.442,2.818-10.917-1.623-14.462l-12.423-9.916
		C494.467,72.83,487.992,73.556,484.447,77.998z M387.45,35.147L372.48,85.37c-1.624,5.446,1.476,11.178,6.921,12.801l15.233,4.54
		c5.445,1.624,11.177-1.476,12.801-6.921l14.97-50.223c1.623-5.446-1.476-11.177-6.922-12.801l-15.232-4.54
		C394.805,26.602,389.073,29.701,387.45,35.147z M281.464,31.752l4.933,52.174c0.535,5.658,5.556,9.811,11.213,9.276l15.824-1.497
		c5.658-0.535,9.811-5.555,9.276-11.213l-4.934-52.174c-0.535-5.658-5.556-9.81-11.213-9.275l-15.824,1.496
		C285.082,21.074,280.929,26.094,281.464,31.752z M181.924,68.308l24.119,46.526c2.615,5.045,8.826,7.015,13.872,4.399l14.111-7.314
		c5.045-2.616,7.015-8.826,4.399-13.872l-24.119-46.526c-2.615-5.045-8.826-7.015-13.872-4.399l-14.111,7.315
		C181.278,57.051,179.309,63.262,181.924,68.308z"/>
        </g>
      ) : (
          <g id="previous-day-icon" transform="matrix(-0.99999927,0,0,1,612.00022,0)">
            <path d="M 304.38477 18.996094 C 299.16996 19.03214 294.72617 23.013984 294.22461 28.318359 L 289.29102 80.492188 C 288.75602 86.150188 292.90841 91.170078 298.56641 91.705078 L 314.39062 93.201172 C 320.04762 93.736172 325.06852 89.583781 325.60352 83.925781 L 330.53711 31.751953 C 331.07211 26.093953 326.91871 21.074063 321.26172 20.539062 L 305.4375 19.042969 C 305.08394 19.009531 304.73242 18.993691 304.38477 18.996094 z M 214.81445 27.794922 C 213.80219 27.782998 212.77112 27.922062 211.75 28.226562 L 196.51758 32.765625 C 191.07158 34.389625 187.9727 40.120406 189.5957 45.566406 L 204.56641 95.789062 C 206.19041 101.23406 211.92219 104.33494 217.36719 102.71094 L 232.59961 98.171875 C 238.04461 96.548875 241.14353 90.815141 239.51953 85.369141 L 224.55078 35.146484 C 223.23209 30.721609 219.20092 27.846592 214.81445 27.794922 z M 406.64062 45.966797 C 402.99064 46.037397 399.49312 48.053047 397.69531 51.521484 L 373.57617 98.046875 C 370.96017 103.09288 372.92961 109.30392 377.97461 111.91992 L 392.08594 119.23242 C 397.13193 121.84842 403.34203 119.87898 405.95703 114.83398 L 430.07617 68.308594 C 432.69117 63.262594 430.72273 57.0515 425.67773 54.4375 L 411.56641 47.121094 C 409.98953 46.303594 408.29974 45.934706 406.64062 45.966797 z M 119.67383 74.128906 C 117.36794 74.091189 115.03473 74.822547 113.0918 76.373047 L 100.66992 86.289062 C 96.228941 89.834063 95.500878 96.309977 99.046875 100.75195 L 131.74023 141.71094 C 135.28523 146.15294 141.76018 146.87803 146.20117 143.33203 L 158.625 133.41797 C 163.066 129.87397 163.79404 123.39608 160.24805 118.95508 L 127.55273 77.998047 C 125.55867 75.499422 122.63854 74.1774 119.67383 74.128906 z M 498.67969 123.63672 C 494.33096 123.73787 490.14336 126.57414 488.91211 131.36914 L 453.11914 270.75 C 451.14814 278.423 458.22257 285.3507 465.85156 283.2207 L 498.76562 274.0332 C 515.08961 381.8702 447.20064 487.71617 337.9668 514.82617 C 224.23988 543.05317 109.27456 471.83466 77.767578 358.97266 L 72.222656 339.11719 C 70.694657 333.64419 65.018918 330.44561 59.544922 331.97461 L 9.9882812 345.80859 C 4.5142868 347.33759 1.3157511 353.01233 2.84375 358.48633 L 8.1445312 377.46875 C 50.514492 529.24075 206.04822 623.62992 358.53711 583.91992 C 505.38892 545.67892 595.38051 400.39639 568.64453 254.52539 L 604.4707 244.52344 C 612.1017 242.39344 614.56234 232.80177 608.90234 227.25977 L 506.07812 126.57812 C 503.95571 124.49989 501.28892 123.57603 498.67969 123.63672 z M 48.789062 152.73828 C 45.138929 152.68163 41.574374 154.57275 39.65625 157.97656 L 31.853516 171.82422 C 29.063518 176.77622 30.814629 183.0518 35.765625 185.8418 L 81.419922 211.57031 C 86.371918 214.36031 92.647502 212.60725 95.4375 207.65625 L 103.24023 193.81055 C 106.03023 188.85855 104.27912 182.58297 99.328125 179.79297 L 53.671875 154.06445 C 52.124689 153.19258 50.448218 152.76403 48.789062 152.73828 z M 12.615234 252.18555 C 7.40153 252.03974 2.8200776 255.86367 2.1347656 261.14648 L 0.0859375 276.9082 C -0.64506181 282.5442 3.3288487 287.7055 8.9648438 288.4375 L 60.935547 295.18945 C 66.570543 295.92245 71.732844 291.9485 72.464844 286.3125 L 74.513672 270.55078 C 75.244671 264.91478 71.270754 259.75153 65.634766 259.01953 L 13.664062 252.26758 C 13.311821 252.22183 12.962815 252.19527 12.615234 252.18555 z "
              transform="matrix(-1.0000007,0,0,1,612.00067,0)" id="path4218" /><path d="m 401.27277,219.0033 c 38.14103,0 52.71879,31.85742 52.71879,31.85742 l -21.53713,14.35742 c 0,0 -10.10185,-18.85156 -28.71486,-18.85156 -13.46201,0 -24.22073,8.31189 -24.22073,22.21289 0,31.638 74.47272,40.82391 74.47272,98.25391 0,4.494 -0.67556,8.98867 -1.35156,14.13867 l -105.65438,0 0,-24.89648 74.47271,0 c -0.676,-30.066 -72.00591,-38.8159 -72.00591,-89.9629 0,-30.067 23.78133,-47.10937 51.82035,-47.10937 z m -139.1544,2.68555 68.64654,100.5039 0,17.73633 -74.47272,0 0,41.04492 -28.49612,0 0,-41.04492 -20.64258,0 0,-24.02148 20.64258,0 0,-94.21875 34.3223,0 z m -6.50001,28.27734 -0.45703,0 c 0,0 1.13086,8.75147 1.13086,16.60547 l 0,49.33594 43.96878,0 0,-0.4375 -36.78908,-50.92774 c -4.27401,-6.064 -7.85353,-14.57617 -7.85353,-14.57617 z"
                id="path4432" /></g>
        )}
    </svg>
  );

export default Hour24;