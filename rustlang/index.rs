fn main() {
    println!("{}", 100);    
    println!("{foo} {bar}", foo=100, bar=200);    

    // left pad with " "
    println!("{:.>width$}", "foo", width=8);
    println!("{:.>width$}", "foobar", width=8);

    // left pad with "0"
    println!("{:0>width$}", 9, width=5);

    let x = 10;
    let y = {
        let a = 10;
        let b = 20;
        a + b + x
    };

    println!("{} {}", x, y);
}