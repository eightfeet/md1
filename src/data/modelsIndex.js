const data = [
  { "imgUrl": "003-y&640&766.jpg", "mdId": "md01", "selected": false },
  { "imgUrl": "013-y&443&706.jpg", "mdId": "md02", "selected": false },
  { "imgUrl": "027-y&639&697.jpg", "mdId": "md03", "selected": false },
  { "imgUrl": "035-y&491&654.jpg", "mdId": "md04", "selected": false },
  { "imgUrl": "049-y&728&708.jpg", "mdId": "md05", "selected": false },
  { "imgUrl": "068-x&759&707.jpg", "mdId": "md06", "selected": false },
  { "imgUrl": "083-x&727&636.jpg", "mdId": "md07", "selected": false },
  { "imgUrl": "103-x&815&666.jpg", "mdId": "md08", "selected": false },
  { "imgUrl": "113-x&858&685.jpg", "mdId": "md09", "selected": false },
  { "imgUrl": "125-y&505&704.jpg", "mdId": "md10", "selected": false },
  { "imgUrl": "138-x&923&612.jpg", "mdId": "md11", "selected": false },
  { "imgUrl": "150-x&914&536.jpg", "mdId": "md12", "selected": false },
  { "imgUrl": "163-y&457&699.jpg", "mdId": "md13", "selected": false },
  { "imgUrl": "176-x&846&630.jpg", "mdId": "md14", "selected": false },
  { "imgUrl": "177-y&832&961.jpg", "mdId": "md15", "selected": false },
  { "imgUrl": "190-y&643&1000.jpg", "mdId": "md16", "selected": false },
  { "imgUrl": "199-x&894&894.jpg", "mdId": "md17", "selected": false },
	{ "imgUrl": "223-y&640&960.jpg", "mdId": "md18", "selected": false },
	{ "imgUrl": "241-x&663&531.jpg", "mdId": "md19", "selected": false },
	{ "imgUrl": "300-y&564&775.jpg", "mdId": "md20", "selected": false },
	{ "imgUrl": "384-x&3000&2400.jpg", "mdId": "md21", "selected": false },
	{ "imgUrl": "402-x&1859&1236.jpg", "mdId": "md22", "selected": false },
	{ "imgUrl": "426-x&1845&1031.jpg", "mdId": "md23", "selected": false },
	{ "imgUrl": "440-y&1062&1422.jpg", "mdId": "md25", "selected": false },
	{ "imgUrl": "453-x&1803&1026.jpg", "mdId": "md26", "selected": false },
	{ "imgUrl": "457-x&1865&1029.jpg", "mdId": "md27", "selected": false },
	{ "imgUrl": "475-x&1799&1021.jpg", "mdId": "md28", "selected": false },
	{ "imgUrl": "488-y&989&1423.jpg", "mdId": "md29", "selected": false },
	{ "imgUrl": "512-x&1859&1159.jpg", "mdId": "md30", "selected": false },
	{ "imgUrl": "518-y&1034&1421.jpg", "mdId": "md31", "selected": false },
	{ "imgUrl": "528-y&905&1423.jpg", "mdId": "md32", "selected": false },
	{ "imgUrl": "543-y&1380&1424.jpg", "mdId": "md33", "selected": false },
	{ "imgUrl": "553-x&1662&1430.jpg", "mdId": "md34", "selected": false },
	{ "imgUrl": "563-x&1720&1245.jpg", "mdId": "md35", "selected": false },
	{ "imgUrl": "589-x&1887&1189.jpg", "mdId": "md36", "selected": false },
	{ "imgUrl": "598-y&913&1411.jpg", "mdId": "md37", "selected": false },
	{ "imgUrl": "615-x&1814&1318.jpg", "mdId": "md38", "selected": false },
	{ "imgUrl": "624-x&1858&1326.jpg", "mdId": "md39", "selected": false },
	{ "imgUrl": "636-y&972&1437.jpg", "mdId": "md40", "selected": false },
	{ "imgUrl": "649-x&1802&1207.jpg", "mdId": "md41", "selected": false },
	{ "imgUrl": "666-x&1442&1393.jpg", "mdId": "md42", "selected": false }
];


const shuffleArray = (array) => {
	let currentIndex = array.length;
	let temporary;
	let toIndex;

	while (currentIndex) {
		toIndex = Math.floor(Math.random() * currentIndex--);
		temporary = array[currentIndex];
		array[currentIndex] = array[toIndex];
		array[toIndex] = temporary;
	}

	return array;
};

const sourcedataindex = shuffleArray(data);

export default sourcedataindex;
