const router = require("express").Router()
const { getAll,getOneCode,deleteCode,addCode} = require("../controllers/codeController")

router.get('/code/:code', getOneCode);
router.get("/code/getAll", getAll)
router.delete('/code/:code', deleteCode);
router.post('/AddCode',addCode)

module.exports = router