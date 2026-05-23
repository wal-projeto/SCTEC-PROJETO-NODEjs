// O parâmentro x implicitamente tem um tipo any
function fn(x: any) {
  return x.flip();
}

const x = {
    nome: "wal",
    id: 2,
}
function fn1(x: any) {
  return x.flip();
}

fn1(x);



const message = "hello!"; 
//message();  <- Essa expressão não pode ser chamada, O tipo String não tem assinatura de função.
