let express = require('express');
let fs = require('fs')
let router = express.Router();

const getProjects = (callback) => {
    let projects = ['Homepage', 'Testing']

    let ls = []
    for(let project of projects) {
        ls.push(callback(project))
    }
    return ls
}

router.get('/data/libs', (req, res, next) => {
    res.send(JSON.parse(fs.readFileSync('public/libs/aalibs.json')))
})

router.get('/:userid', (req, res, next) => {
    res.render('cloud/index', {
        title: 'CM',
        userid: req.params.userid,
        isInProject: false,
        baseurl: `/cloud/${req.params.userid}`,
        projects: getProjects((name) => {
            return {
                name: name,
                id: name.toLowerCase(),
                active: false
            }
        }),
    })
});

router.get('/:userid/:projectid', (req, res, next) => {

    const isActive = (name) => {
        return req.params.projectid == name
    }

    res.render('cloud/index', {
        title: 'CM',
        userid: req.params.userid,
        projectid: req.params.projectid,
        isInProject: true,
        baseurl: `/cloud/${req.params.userid}`,
        projects: getProjects((name) => {
            return {
                name: name,
                id: name.toLowerCase(),
                active: isActive(name.toLowerCase())
            }
        }),
    })
})

router.get('/:userid/:projectid/functions', (req, res, next) => {

    const isActive = (id) => {
        console.log(id, req.params.projectid)
        return req.params.projectid == id
    }

    res.render('cloud/index', {
        title: 'CM',
        userid: req.params.userid,
        projectid: req.params.projectid,
        isInProject: true,
        baseurl: `/cloud/${req.params.userid}`,
        projects: getProjects((name) => {
            return {
                name: name,
                id: name.toLowerCase(),
                active: isActive(name.toLowerCase())
            }
        }),
        functions: [
            {
                name: 'GetUser',
                type: 'Public',
                category: 'Data Retrieval',
                status: 'Active',
            },
            {
                name: 'NewUser',
                type: 'Public',
                category: 'Data Creation',
                status: 'Active',
            }
        ]
    })
})

router.get('/:userid/:projectid/functions/:functionid', (req, res, next) => {

    const isActive = (id) => {
        console.log(id, req.params.projectid)
        return req.params.projectid == id
    }

    res.render('cloud/index', {
        title: 'CM',
        userid: req.params.userid,
        projectid: req.params.projectid,
        functionid: req.params.functionid,
        isInProject: true,
        baseurl: `/cloud/${req.params.userid}`,
        projects: getProjects((name) => {
            return {
                name: name,
                id: name.toLowerCase(),
                active: isActive(name.toLowerCase()),
                baseurl: `/cloud/${req.params.userid}`
            }
        }),
        functions: [
            {
                name: 'GetUser',
                type: 'Public',
                category: 'Data Retrieval',
                status: 'Active',
                active: req.params.functionid == 'GetUser'
            },
            {
                name: 'NewUser',
                type: 'Public',
                category: 'Data Creation',
                status: 'Active',
                active: req.params.functionid == 'NewUser'
            }
        ]
    })
})

module.exports = router;
