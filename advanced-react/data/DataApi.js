class DataApi{
  constructor(rawData){
    this.rawData = rawData;
  }

  mapIntoObject(arr){
    return arr.reduce((acc, current) => {
      acc[current.id] = current;
      return acc;
    }, {});
  }

  getAuthors(){
    return this.mapIntoObject(this.rawData.authors);
  }

  getArticles(){
    return this.mapIntoObject(this.rawData.articles);
  }
}

export default DataApi;
