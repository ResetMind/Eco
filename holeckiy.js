function holeckiy(a, b) {
    let n = a.length;
    let l = new Array(n);
    let u = new Array(n);
    let y = new Array(n);
    let x = new Array(n);
    for(let i = 0; i < n; i++) {
        l[i] = new Array(n);
        u[i] = new Array(n);
        for(let j = 0; j < n; j++) {
            l[i][j] = 0;
            u[i][j] = 0;
        }
    }
    for(let i = 0; i < n; i++) {
        l[i][0] = a[i][0];
        u[0][i] = a[0][i] / l[0][0];
        if(i == 0) {
            y[0] = b[0] / l[0][0];
        }
        let sum_y = 0;
        for(let j = 1; j <= i; j++) {
            let sum_l = 0;
            let sum_u = 0;
            sum_y = 0;
            for(let k = 0; k <= j - 1; k++) {
                sum_l += l[i][k] * u[k][j];
                sum_u += l[j][k] * u[k][i];
                sum_y += l[i][k] * y[k];
            }
            l[i][j] = a[i][j] - sum_l;
            u[j][i] = (a[j][i] - sum_u) / l[j][j];
        }
        if(i != 0) {
            y[i] = (b[i] - sum_y) / l[i][i];
        }
    }
    x[n - 1] = y[n - 1];
    for(let i = n - 2; i >= 0; i--) {
        let sum_x = 0;
        for(let k = i + 1; k < n; k++) {
            sum_x += u[i][k] * x[k];
        }
        x[i] = y[i] - sum_x;
    }
    console.log(x);
}