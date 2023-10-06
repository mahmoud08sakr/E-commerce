class APIFatures {
    constructor(mongooQuery, queryString) {
        this.mongooQuery = mongooQuery;
        this.queryString = queryString;
    }

    pagination() {

        let page = this.queryString * 1 || 1;
        if (this.queryString.page <= 0) {
            page = 1;
        }
        let skip = (page - 1) * 4
        this.mongooQuery.skip(skip).limit(6)
        return this
    }

    filter(){
        let filterOpj = {...this.queryString}
        let exclidedQuery = ["sort", "page", "keywords", "felids"]
        exclidedQuery.forEach((q) => {
            delete filterOpj[q];
    
        })

        filterOpj=JSON.stringify(filterOpj)
        filterOpj=filterOpj.replace(/\bgt|gte|lt|lte\b/g,(match)=>`$${match}`)
        filterOpj= JSON.parse(filterOpj)

        this.mongooQuery.find(filterOpj)
        return this
    }

    sort(){
        if( this.queryString){
            let sortBy =this.queryString.sort.split(',').join(' ')
            mongooQuery.sort(sortBy)
            console.log(mongooQuery +this.queryString.sort);
        }
    return this
    
    }

    search(){
        if(this.queryString.keyword){
            mongooQuery.find({title:req.query.keyword})
            
            }
            return this
        
        
    }

    fields(){
        if(this.queryString.fields){
            let fields =this.queryString.fields.split(',').join(' ')
            this.mongooQuery.select(fields)
        }
        return this



    }
}