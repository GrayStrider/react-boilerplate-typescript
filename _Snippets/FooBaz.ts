const FooBaz = (len: number = 100) => {
  for (let i = 1; i <= len; i++) {
    const result =
      (i % 3 === 0) ? 'Foo' :
      (i % 5 === 0) ? 'Baz' :
      (i)
    console.log(result)
  }
}
