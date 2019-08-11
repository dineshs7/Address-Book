var express = require('express');
var router = express.Router();
//const {check, validationResult} = require('express-validator/check');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*router.post('/', [
  check('empid').not().isEmpty().withMessage('Name must have more than 5 characters'),
  check('fname', 'Class Year should be a number').not().isEmpty(),
  check('dob', 'Choose a weekday').optional(),
  check('mail', 'Your email is not valid').not().isEmpty(),
  check('phno', 'Your password must be at least 5 characters').not().isEmpty(),
],
function (req, res) {
  const errors = validationResult(req);
  console.log(req.body);

  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array());
  } else {
    res.send({});
  }
}); */

module.exports = router;
