const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const FormData = require('form-data')

router.get('/', (req, res) => {
    res.status(406).json({
        status: 406,
        message: "Please set the youtube video id!"
    })
})

router.get('/:link', async (req, res) => {
    let link = req.params.link

    let fullLink = `https://www.youtube.com/watch?v=${link}`
    let linkIsValid = fullLink.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/)

    if(linkIsValid === null || linkIsValid[2].length != 11) return res.status(406).json({status: 406, message: "Invalid link!"})

    const formData = new FormData()
    formData.append('type', 'mkv')
    formData.append('search_txt', fullLink)

    const getRawData = await fetch('https://www.bestmp3converter.com/models/convertProcess.php', {method: 'POST', body: formData})
    const rawData = await getRawData.text()
    let breakedRawData = rawData.trim().split(" ")
    let links = [], sizes = [], info=[]
    for(let i=0; i<breakedRawData.length; i++){
        if(breakedRawData[i].includes("data-link")){
            console.log(breakedRawData[i].substring(breakedRawData[i].indexOf('"')+1, breakedRawData[i].lastIndexOf('"')))
            console.log(breakedRawData[i].substring(breakedRawData[i].indexOf('>')+1, breakedRawData[i].lastIndexOf('<')))
            
        }
    }

})

module.exports = router