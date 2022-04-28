import axios from "axios";
const fetchData = async (user_data_1, user_data_2) => {
  const result = await axios(
    `http://anyurltest/${user_data_1}/${user_data_2}`
  );

  return result;
};

export default fetchData;
