const buildUrlV2 = (rootURl, path, params) => {
    let query = ""
    Object.entries(params).forEach(([key, value]) => {
        query += `&${key}=${value}`
    })
    query = query.substring(1)
}

buildUrlV2("", "", { search: "hoody", page: 1, maison: "aasca" })