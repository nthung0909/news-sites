const exppress = require('express');
const redi = require('../middlewares/auth.mdw');
const cateModel = require('../models/category.model');
const posts = require('../models/posts.model');
const router = exppress.Router();

router.get('/', async(req, res) => {
    // const cate = await cateModel.all();
    const top10 = await posts.getTopView(10);
    top10.forEach(item => delete item.content);
    const hightlight = await posts.topWeek(3);
    const newpost = await posts.newpost(10);
    res.render('readers/home', {
        authUser: res.locals.lcAuthUser,
        isLogin: res.locals.lcLogin,
        topview: top10,
        topweek: hightlight,
        newpost: newpost
    });
});
router.get('/posts', async(req, res) => {
    console.log(req.query.id);
    const news = await posts.single(req.query.id);
    console.log(news[0]);
    res.render('readers/posts', {
        _posts: news[0]
    });

});
router.post('/logout', function(req, res) {
    req.session.isLogin = false;
    req.session.authUser = null;
    res.redirect(req.headers.referer);
})
module.exports = router;