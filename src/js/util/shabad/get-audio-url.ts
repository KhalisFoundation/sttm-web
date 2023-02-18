import axios from "axios";
import { API_URL, S3_BUCKET_URL } from "@/constants";

export const checkAPI = async function () {
  let uri = `${API_URL}health/`;
  let user = 'admin';
  let password = process.env.AUDIO_API_PASS;
  let APIisHealthy = false;

  const res = await axios.get(uri, {
    headers: {
      'Accept': '*/*',
      'Authorization': `Basic ${btoa(user + ':' + password)}`,
      'Content-Type': 'application/json',
      'Connection': 'keep-alive'
    }
  }).then((response) => {
    if (response.data.ok) {
      APIisHealthy = true;
    }
  }).catch((error) => {
    console.error({
        message: "Audio API is down!",
        error
    })
    return {data:{status: "error"}}
  });;

  return APIisHealthy;
}

export const getAudio = async function (info: any) {
  let uri = `${API_URL}shabads/${info.shabadId}/`;
  let user = 'admin';
  let password = process.env.AUDIO_API_PASS;

  const res = await axios.get(uri, {
    headers: {
      'Accept': '*/*',
      'Authorization': `Basic ${btoa(user + ':' + password)}`,
      'Content-Type': 'application/json',
      'Connection': 'keep-alive'
    }
  }).catch((error) => {
    // console.log(error);
    return {data:{status: "error"}}
  });

  let hasAudio = false;
  if (res.data.status === 'success') {
    hasAudio = true;
    let shbdUrl = `${S3_BUCKET_URL}${res.data.track_url.replace(/%20/g, "+")}`;
    return shbdUrl;
  } else {
    console.log('No audio for this shabad');
  }
  return hasAudio ;
}
