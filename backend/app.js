/** Imports */
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

// Config JSON response
app.use(express.json()); // Correção: chamar a função express.json()

//Models
const User = require('./models/User')

// Open Route - Public Route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem-vindo à nossa API!" });
});

// Private Route
app.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id

  //checa se o usuário existe
  const user = await User.findById(id, '-password')

  if(!user) {
    return res.status(404).json({msg: 'Usuário não encontrado'})
  }
  res.status(200).json({ user })
})

function checkToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ msg: 'Acesso negado!' })
  }

  try {
    const secret = process.env.SECRET // Confirme se está correto
    console.log('Token recebido:', token)
    console.log('Secret usado:', secret)

    jwt.verify(token, secret)
    next()
  } catch (error) {
    console.log('Erro ao verificar token:', error.message)
    res.status(400).json({ msg: 'Token Inválido!' })
  }
}


// Register User
app.post("/auth/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Validations
  if (!name) {
    return res.status(422).json({ msg: "O nome é obrigatório!" });
  }

  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  }

  if (password !== confirmPassword) {
    return res.status(422).json({ msg: "As senhas não conferem!" });
  }

  //verifica se o usuário existe
  const userExists = await User.findOne({ email: email })

  if(userExists) {
    return res.status(422).json({ msg: `O e-mail ${email} já está cadastrado. Utilize outro e-mail` });
  }

  //criar senha
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  //criar usuário
  const user = new User({
    name,
    email,
    password: passwordHash,
  })

  try {
    await user.save()
    res.status(201).json({msg: "Usuário criado com sucesso!"})
  } catch (error) {
    console.log(error)
    res.status(500).json({msg: 'Ocorreu um erro no servidor. Tente novamente mais tarde!'})
  }

  return res.status(201).json({ msg: "Usuário registrado com sucesso!" });
});

//Login
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body

  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  }

  //verifica se o usuário existe
  const user = await User.findOne({ email: email })

  if(!user) {
    return res.status(404).json({ msg: 'Usuário não encontrado!' });
  }

  //verificar se a senha combina
  const checkPassword = bcrypt.compare(password, user.password)

  if(!checkPassword) {
    return res.status(422).json({ msg: 'Senha inválida' })
  }

  try {
    const secret = process.env.SECRET
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret,
    )

    res.status(200).json({msg: 'Autenticação realizada com sucesso!', token})
  } catch (error) {
    console.log(error)
    res.status(500).json({msg: 'Ocorreu um erro no servidor. Tente novamente mais tarde!'})
  }
})

// Credenciais
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.svlhd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("Conectado ao banco!");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
  })
  .catch((err) => console.log("Erro ao conectar ao banco:", err));
