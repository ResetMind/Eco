function linear(x, y) {
    let a = create2DimArray(2);
    let b = new Array(2);
    a[0][0] = x.length;
    a[0][1] = 0;
    a[1][1] = 0;
    for(let i = 0; i < x.length; i++) {
        x[i] = parseFloat(x[i]);
        a[0][1] += x[i];
        a[1][1] += x[i] * x[i];
    }
    a[1][0] = a[0][1];
    b[0] = 0;
    b[1] = 0;
    for(let i = 0; i < y.length; i++) {
        y[i] = parseFloat(y[i]);
        b[0] += y[i];
        b[1] += y[i] * x[i];
    }
    let coef = holeckiy(a, b);
    let y_tr = new Array();
    for(let i = 0; i < x.length; i++) {
        y_tr.push(get_y_tr(x[i]));
    }
    function get_y_tr(x) {
        return coef[0] + coef[1] * x;
    }
    return y_tr;
}

function holeckiy(a, b) {
    let n = a.length;
    let l = create2DimArray(n);
    let u = create2DimArray(n);
    let y = create2DimArray(n);
    let x = create2DimArray(n);
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
    return x;
}

function create2DimArray(n) {
    let arr = new Array(n);
    for(let i = 0; i < n; i++) {
        arr[i] = new Array(n);
        for(let j = 0; j < n; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}