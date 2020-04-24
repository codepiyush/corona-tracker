const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema, GraphQLEnumType, GraphQLInputObjectType } = require('graphql');
const axios = require('axios');

const CountryType = new GraphQLObjectType({
    name: "Country",
    fields: () => ({
        country: { type: GraphQLString },
        cases: { type: CaseType },
        deaths: { type: DeathType },
        tests: { type: TestType }
    })
});

//case type

const CaseType = new GraphQLObjectType({
    name: "Cases",
    fields: () => ({
        new: { type: GraphQLString },
        active: { type: GraphQLInt },
        critical: { type: GraphQLInt },
        recovered: { type: GraphQLInt },
        total: { type: GraphQLInt }
    })
});

const DeathType = new GraphQLObjectType({
    name: "Deaths",
    fields: () => ({
        new: { type: GraphQLString },
        total: { type: GraphQLInt }
    })
});

const TestType = new GraphQLObjectType({
    name: "Tests",
    fields: () => ({
        total: { type: GraphQLInt }
    })
});

const RapidApiHeaders = {
    headers: {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "e87167a5d3msh63c6e15c08e4152p1cc239jsnd990ae4e7d99"
    }
}

const SortableField = new GraphQLEnumType({
    name: "field",
    values: {
        country: { value: "country" },
        totalCases: { value: "total" }
    }
})

const SortableOrder = new GraphQLEnumType({
    name: "order",
    values: {
        ASC: { value: "ASC" },
        DESC: { value: "DESC" }
    }
})

const SortType = new GraphQLInputObjectType({
    name: "sort",
    fields: () => ({
        field: { type: SortableField },
        order: { type: SortableOrder }
    })
})

function compare(key = null, order = 'ASC') {
    return function innerSort(a, b) {
        if (key == null) {
            return 0;
        }
        if (key == "country") {
            // if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            //     return 0;
            // }

            const varA = (typeof a[key] === 'string')
                ? a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string')
                ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order === 'DESC') ? (comparison * -1) : comparison
            );
        }
        else if (key == "total") {

            const varA = (typeof a[key] === 'string')
                ? a.cases[key].toUpperCase() : a.cases[key];
            const varB = (typeof b[key] === 'string')
                ? b.cases[key].toUpperCase() : b.cases[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order === 'DESC') ? (comparison * -1) : comparison
            );
        }
    };
}

const onlyCountries = (country) => (country.country !== "Europe" && country.country !== "North-America" && country.country !== "Asia" && country.country !== "South-America" && country.country !== "Africa")

const RootQueryType = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        all: {
            type: new GraphQLList(CountryType),
            args: {
                sort: {
                    type: SortType,
                    defaultValue: {
                        field: null,
                        order: "ASC"
                    }
                }
            },
            resolve(parent, args) {
                return axios.get("https://covid-193.p.rapidapi.com/statistics", RapidApiHeaders)
                    .then(res => {
                        return (
                            res.data.response.sort(compare(args.sort.field, args.sort.order)).filter(onlyCountries)
                        )
                    })
            }
        },
        single: {
            type: CountryType,
            args: {
                name: { type: GraphQLString }
            },
            resolve(parent, args) {
                return (
                    axios.get(`https://covid-193.p.rapidapi.com/statistics?country=${args.name}`, RapidApiHeaders)
                        .then(res => res.data.response[0])
                )
            }
        }
    }
});

const Schema = new GraphQLSchema({
    query: RootQueryType
});


module.exports = Schema;