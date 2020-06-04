const router = require('express').Router();
const {check, validationResult} = require('express-validator');
const Task = require('../models/tasks.js');

router.get('/', (req, res) => {
    Task.findAll().then(tasks => {
        if (tasks.length > 0) {
            return res.json({
                data: tasks
            });
        } else {
            return res.status(404).json({
                error: [{
                    value: ' ',
                    msg: 'Nenhuma tarefa encontrada.'
                }]
            });
        }
    });
});

router.get('/:id', [
    check('id', 'id deve ser um número inteiro.')
        .trim()
        .escape()
        .isInt()
        .toInt()
], (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        Task.findByPk(req.params.id).then(task => {
            if(task) {
                return res.json({
                    data: [task]
                });
            } else {
                return res.status(404).json({
                    error: [{
                        value: '',
                        msg: 'Tarefa não encontrada.'
                    }]
                })
            }
        }).catch(error => {
            console.log(error);
            return res.status(500).json({
                error: [{
                    value: ' ',
                    msg: 'Falha ao comunicar com o SGBD.'
                }]
            });
        });
    } else {
        return res.status(422).json(errors);
    }
});

router.post('/', [
    check('name', 'Nome é campo obrigatório.')
        .trim()
        .escape()
        .notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        Task.create({
            name: req.body.name,
            description: req.body.description
        }).then(task => {
            return res.json({
                data: [task]
            });
        }).catch(error => {
            console.log(error);
            return res.status(500).json({
                error: [{
                    value: ' ',
                    msg: 'Falha ao comunicar com o SGBD.'
                }]
            });
        });
    } else {
        return res.status(422).json(errors);
    }
});

router.put('/:id', [
    check('name', 'Nome é campo obrigatório.')
        .trim()
        .escape()
        .notEmpty(),
    check('id', 'id deve ser um número inteiro.')
        .trim()
        .escape()
        .isInt()
        .toInt()
], (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        Task.update({
            name: req.body.name,
            description: req.body.description
        }, {
            where:{
                id: req.params.id
                }
            }).then(rows => {
                if (rows[0] === 1) {
                    return res.json({
                        data: rows[0]
                    });
                } else if (rows[0] === 0) {
                    return res.status(404).json({
                        error: [{
                            value: ' ',
                            msg: 'Tarefa não encontrada.'
                        }]
                    });
                }
            }).catch(error => {
            console.log(error);
            return res.status(500).json({
                error: [{
                    value: ' ',
                    msg: 'Falha ao comunicar com o SGBD.'
                }]
            });
        });
    } else {
        return res.status(422).json(errors);
    }
});

router.delete('/:id', [
    check('id', 'id deve ser um número inteiro.')
        .trim()
        .escape()
        .isInt()
        .toInt()
], (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        Task.destroy({
            where:{
                id: req.params.id
            }
        }).then(rows => {
            if (rows === 1) {
                return res.json({
                    data: [{
                        rows: rows
                    }]
                });
            } else if (rows === 0) {
                return res.status(404).json({
                    error: [{
                        value: ' ',
                        msg: 'Tarefa não encontrada.'
                    }]
                });
            } else  {
                console.log(error);
                return res.status(500).json({
                    error: [{
                        value: ' ',
                        msg: 'Tarefa não encontrada.'
                    }]
                });
            }
        }).catch(error => {
            console.log(error);
            return res.status(500).json({
                error: [{
                    value: ' ',
                    msg: 'Falha ao comunicar com o SGBD.'
                }]
            });
        });
    } else {
        return res.status(422).json(errors);
    }
});


module.exports = router;