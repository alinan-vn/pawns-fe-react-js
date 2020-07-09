function dateFilter(dateData){
    let date = dateData.split('T')[0].split('-')
    let year = date[0]
    let month = date[1]
    let day = date[2]

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']

    let monthNum = parseInt(month) - 1
    month = months[monthNum]

    date = `${month} ${day}, ${year}`
    return date
}

export {
    dateFilter
}