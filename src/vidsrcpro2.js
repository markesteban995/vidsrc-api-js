export async function getvidsrc(tmdb_id, s, e) {
  //const DOMAIN = "https://embed.su";
  const DOMAIN = "https://vidsrc.cc";

  const headers = {
    'user-agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    'Referer': `${DOMAIN}`,
    'Origin': `${DOMAIN}`,
  };

  try {
    let urlSearch = '';

    if(s && e){
      urlSearch = `${DOMAIN}/v2/embed/tv/${tmdb_id}/${s}/${e}`;
    } else {
      urlSearch = `${DOMAIN}/v2/embed/movie/${tmdb_id}`;
    }
    
    const htmlSearch = await fetch(urlSearch, {
      method: 'GET',
      headers: headers,
    });
    const textSearch = await htmlSearch.text();

    const hashEncodeMatch = textSearch.match(/JSON\.parse\(atob\(\`([^\`]+)/i);
    const hashEncode = hashEncodeMatch ? hashEncodeMatch[1] : "";

    if (!hashEncode) {
      return;
    }

     return hashEncode;

  } catch (e) {
    const results = {
      headers: {},
      sources: '',
      subtitles: ''
    };
    return results;
  }
}

async function string_atob(input) {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var str = input.replace(/=+$/, '');
  var output = '';
  if (str.length % 4 == 1) {
    throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
  }
  for (var bc = 0, bs = 0, buffer = void 0, i = 0; buffer = str.charAt(i++); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
    bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
    buffer = chars.indexOf(buffer);
  }
  return output;
}

async function request_get(url, headers = {}) {
  try {
    headers = headers || {};
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return "";
  }
}