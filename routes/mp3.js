const express = require('express')
const router = express.Router()
const cheerio = require("cheerio");
const axios = require("axios");

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

    const getRawData = await axios.get(`https://api.vevioz.com/api/button/mp3/${link}`)
    const $ = cheerio.load(getRawData.data)
    const scrapeLinks = $("a"), links = [], sizes = [];
    scrapeLinks.each((index, value) => {
        links.push($(value).attr('href'));
        sizes.push($(value).find('.text-shadow-1').text().substring($(value).find('.text-shadow-1').text().indexOf('s')+1));
    })

    if(!links.length) return res.status(406).json({status: 406, message: "Invalid link!"})

    let output = {
        hh: {
            link: "",
            size: ""
        },
        h: {
            link: "",
            size: ""
        }, 
        m: {
            link: "",
            size: ""            
        },
        l: {
            link: "",
            size: ""
        }, 
        vl: {
            link: "",
            size: ""
        }
    }

    for(let i=0; i<links.length; i++){
        if(links[i].includes("/mp3/320/")){
            output.hh.link = links[i]
            output.hh.size = sizes[i]
        } else if (links[i].includes("/mp3/256/")){
            output.h.link = links[i]
            output.h.size = sizes[i]
        } else if (links[i].includes("/mp3/192/")){
            output.m.link = links[i]
            output.m.size = sizes[i]
        } else if (links[i].includes("/mp3/128/")){
            output.l.link = links[i]
            output.l.size = sizes[i]
        } else if (links[i].includes("/mp3/64/")){
            output.vl.link = links[i]
            output.vl.size = sizes[i]
        }
    }

    res.json({
        status: 200,
        message: "made with <3 by @datwalkerv",
        links: output, 
        thumbnail: `https://img.youtube.com/vi/${link}/maxresdefault.jpg`
    }) 
    
})

router.get('/advanced/:link', async (req, res) => {
    let link = req.params.link

    let fullLink = `https://www.youtube.com/watch?v=${link}`
    let linkIsValid = fullLink.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/)

    if(linkIsValid === null || linkIsValid[2].length != 11) return res.status(406).json({status: 406, message: "Invalid link!"})

    const getRawData = await axios.get(`https://api.vevioz.com/api/button/mp3/${link}`)
    const $ = cheerio.load(getRawData.data)
    const scrapeLinks = $("a"), links = [], sizes = [];
    scrapeLinks.each((index, value) => {
        links.push($(value).attr('href'));
        sizes.push($(value).find('.text-shadow-1').text().substring($(value).find('.text-shadow-1').text().indexOf('s')+1));
    })

    if(!links.length) return res.status(406).json({status: 406, message: "Invalid link!"})

    const getYTData = await axios.get(`https://y.com.sb/api/v1/videos/${link}`)
    const ytData = await getYTData.data

    let output = {
        hh: {
            link: "",
            size: ""
        },
        h: {
            link: "",
            size: ""
        }, 
        m: {
            link: "",
            size: ""            
        },
        l: {
            link: "",
            size: ""
        }, 
        vl: {
            link: "",
            size: ""
        }
    }

    for(let i=0; i<links.length; i++){
        if(links[i].includes("/mp3/320/")){
            output.hh.link = links[i]
            output.hh.size = sizes[i]
        } else if (links[i].includes("/mp3/256/")){
            output.h.link = links[i]
            output.h.size = sizes[i]
        } else if (links[i].includes("/mp3/192/")){
            output.m.link = links[i]
            output.m.size = sizes[i]
        } else if (links[i].includes("/mp3/128/")){
            output.l.link = links[i]
            output.l.size = sizes[i]
        } else if (links[i].includes("/mp3/64/")){
            output.vl.link = links[i]
            output.vl.size = sizes[i]
        }
    }

    res.json({
        status: 200,
        message: "made with <3 by @datwalkerv",
        links: output,
        title: ytData.title,
        description: ytData.description,
        published: ytData.published,
        views: ytData.viewCount,
        author: {
            name: ytData.author,
            id: ytData.authorId, 
            link: `https://www.youtube.com/channel/${ytData.authorId}`,
            subscribers: ytData.subCountText,
        },
        length: ytData.lengthSeconds,
        thumbnail: `https://img.youtube.com/vi/${link}/maxresdefault.jpg`
    }) 
})

module.exports = router
