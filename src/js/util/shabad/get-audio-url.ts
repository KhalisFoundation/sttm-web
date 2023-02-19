import axios from "axios";
import { API_URL, S3_BUCKET_URL } from "@/constants";

export const checkAPI = async function () {
  const uri = `${API_URL}health/`;
  const user = 'admin';
  const password = process.env.AUDIO_API_PASS;
  let APIisHealthy = false;
  try {
    const res = await axios.get(uri, {
      headers: {
        'Accept': '*/*',
        'Authorization': `Basic ${btoa(user + ':' + password)}`,
        'Content-Type': 'application/json',
        'Connection': 'keep-alive'
      }
    });
    if (res.data.ok) {
      APIisHealthy = true;
    }
  } catch (error) {
    console.error({
      message: "Audio API is down!",
      error
    })
  }
  return APIisHealthy;
}

export const getShabadAudioUrl = async function (info: any) {
  const uri = `${API_URL}shabads/${info.shabadId}/`;
  const user = 'admin';
  const password = process.env.AUDIO_API_PASS;
  let res;
  try {
    res = await axios.get(uri, {
      headers: {
        'Accept': '*/*',
        'Authorization': `Basic ${btoa(user + ':' + password)}`,
        'Content-Type': 'application/json',
        'Connection': 'keep-alive'
      }
    })
  } catch(error) {
    res = {
      data: {
        status: "error",
        error
      }
    }
  };

  let shbdUrl = '';
  if (res.data.status === 'success') {
    shbdUrl = `${S3_BUCKET_URL}${res.data.track_url.replace(/%20/g, "+")}`;
  } else {
    console.log('No audio for this shabad');
  }
  return shbdUrl;
}
