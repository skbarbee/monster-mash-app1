////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")

const Student = require("../models/character")
/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////
// Routes
////////////////////////////////////////////
// POST
// only loggedIn users can post comments
router.post("/:studentId", (req, res) => {
    const studentId = req.params.studentId

    if (req.session.loggedIn) {
        // we want to adjust req.body so that the author is automatically assigned
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }
    // find a specific fruit
    Student.findById(studentId)
        // do something if it works
        //  --> send a success response status and maybe the comment? maybe the fruit?
        .then(student => {
            // push the comment into the fruit.comments array
            student.comments.push(req.body)
            // we need to save the fruit
            return student.save()
        })
        .then(student => {
            // res.status(200).json({ fruit: fruit })
            console.log(student.id)
            res.redirect(`/characters/${student.id}`)
            
        })
        // do something else if it doesn't work
        //  --> send some kind of error depending on what went wrong
        .catch(err => console.log(err))
})

// DELETE
// only the author of the comment can delete it
router.delete('/delete/:studentId/:commId', (req, res) => {
    // isolate the ids and save to vars for easy ref
    const studentId = req.params.fruitId 
    const commId = req.params.commId
    // get the fruit
    Student.findById(studentId)
        .then(student => {
            // get the comment
            // subdocs have a built in method that you can use to access specific subdocuments when you need to.
            // this built in method is called .id()
            const theComment = student.comments.id(commId)
            console.log('this is the comment that was found', theComment)
            // make sure the user is logged in
            if (req.session.loggedIn) {
                // only let the author of the comment delete it
                if (theComment.author == req.session.userId) {
                    // find some way to remove the comment
                    // here's another built in method
                    theComment.remove()
                    student.save()
                    res.redirect(`/characters/${student.id}`)
                    // return the saved fruit
                    // return fruit.save()
                } else {
                    const err = 'you%20are%20not%20authorized%20for%20this%20action'
                    res.redirect(`/error?error=${err}`)
                }
            } else {
                const err = 'you%20are%20not%20authorized%20for%20this%20action'
                res.redirect(`/error?error=${err}`)
            }
        })
        // send an error if error
        .catch(err => res.redirect(`/error?error=${err}`))

})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router