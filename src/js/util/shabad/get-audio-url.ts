import { API_URL } from '@/constants';

export const checkAPIHealth = async function () {
  const uri = `${API_URL}health/`;
  const user = 'admin';
  const password = process.env.AUDIO_API_PASS;
  let APIisHealthy = false;
  try {
    const res = await fetch(uri, {
      method: 'GET',
      headers: {
        Accept: '*/*',
        Authorization: `Basic ${btoa(user + ':' + password)}`,
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
      },
    });

    if (res.ok) {
      const data = await res.json();
      if (data.ok) {
        APIisHealthy = true;
      }
    }
  } catch (error) {
    console.error({
      message: 'Audio API is down!',
      error,
    });
  }
  return APIisHealthy;
};

export const getShabadAudioUrl = async function (info: any) {
  const uri = `${API_URL}shabads/${info.shabadId}/`;
  const user = 'admin';
  const password = process.env.AUDIO_API_PASS;
  let res;
  try {
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        Accept: '*/*',
        Authorization: `Basic ${btoa(user + ':' + password)}`,
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
      },
    });

    if (response.ok) {
      const data = await response.json();
      res = { data };
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    res = {
      data: {
        status: 'error',
        error,
      },
    };
  }

  let shbdUrl = '';
  if (res.data.status === 'success') {
    shbdUrl = `${res.data.track_url.replace(/%20/g, '+')}`;
  } else {
    console.log('No audio for this shabad');
  }
  return shbdUrl;
};
