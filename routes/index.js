const express = require('express')
const Article = require('../models/article')
const router = express.Router()

router.get('/', async ( req, res ) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

router.get('/search', async ( req, res ) => {
  if (!req.query.query) {
    return res.redirect('/')
  }

  const query = req.query.query.replace(/\s+/g,' ').trim()
  
  try {
    const articles = await Article.find({ title: { $regex: query, $options: 'i' } })
    
    res.render('articles/search', { query: query, articles: articles })
  } catch (e) {
    res.redirect('/')
  }
})

router.get('/error', ( req, res ) => {
  res.render('error')
})

module.exports = router