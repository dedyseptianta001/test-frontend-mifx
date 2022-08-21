import moment from 'moment';

const SimpleDateTime = (dateTime) => {
   const data = moment(dateTime);
   return data.format("YYYY")+'/'+data.format("MM")+'/'+data.format("DD");
}

const DateParse = (dateTime) => {
   const data = moment(dateTime);
   return Date.parse(data.format("YYYY")+'/'+data.format("MM")+'/'+data.format("DD"));
}

export {
   SimpleDateTime,
   DateParse,
}