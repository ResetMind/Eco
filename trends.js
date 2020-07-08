function linear(x, y) {
    let a = create2DimArray(2);
    let b = new Array(2);
    a[0][0] = x.length;
    a[0][1] = 0;
    a[1][1] = 0;
    for(let i = 0; i < x.length; i++) {
        a[0][1] += x[i];
        a[1][1] += Math.pow(x[i], 2);
    }
    a[1][0] = a[0][1];
    b[0] = 0;
    b[1] = 0;
    for(let i = 0; i < y.length; i++) {
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

function hyperbole(x, y) {
    let a = create2DimArray(2);
    let b = new Array(2);
    a[0][0] = x.length;
    a[0][1] = 0;
    a[1][1] = 0;
    for(let i = 0; i < x.length; i++) {
        a[0][1] += 1 / x[i];
        a[1][1] += 1 / Math.pow(x[i], 2);;
    }
    a[1][0] = a[0][1];
    b[0] = 0;
    b[1] = 0;
    for(let i = 0; i < y.length; i++) {
        b[0] += y[i];
        b[1] += y[i] / x[i];
    }
    let coef = holeckiy(a, b);
    let y_tr = new Array();
    for(let i = 0; i < x.length; i++) {
        y_tr.push(get_y_tr(x[i]));
    }
    function get_y_tr(x) {
        return coef[0] + coef[1] * 1 / x;
    }
    return y_tr;
}

function parabole2(x, y) {
    let a = create2DimArray(3);
    let b = new Array(3);
    a[0][0] = x.length;
    a[0][1] = 0;
    a[0][2] = 0;
    a[1][2] = 0;
    a[2][2] = 0;
    for(let i = 0; i < x.length; i++) {
        a[0][1] += x[i];
        a[0][2] += Math.pow(x[i], 2);
        a[1][2] += Math.pow(x[i], 3);
        a[2][2] += Math.pow(x[i], 4);
    }
    a[1][0] = a[0][1];
    a[1][1] = a[0][2];
    a[2][0] = a[1][1];
    a[2][1] = a[1][2];
    b[0] = 0;
    b[1] = 0;
    b[2] = 0;
    for(let i = 0; i < y.length; i++) {
        b[0] += y[i];
        b[1] += y[i] * x[i];
        b[2] += y[i] * Math.pow(x[i], 2);
    }
    let coef = holeckiy(a, b);
    let y_tr = new Array();
    for(let i = 0; i < x.length; i++) {
        y_tr.push(get_y_tr(x[i]));
    }
    function get_y_tr(x) {
        return coef[0] + coef[1] * x + coef[2] * Math.pow(x, 2);
    }
    return y_tr;
}

function parabole3(x, y) {
    let a = create2DimArray(4);
    let b = new Array(4);
    a[0][0] = x.length;
    a[0][1] = 0;
    a[0][2] = 0;
    a[0][3] = 0;
    a[1][3] = 0;
    a[2][3] = 0;
    a[3][3] = 0;
    for(let i = 0; i < x.length; i++) {
        a[0][1] += x[i];
        a[0][2] += Math.pow(x[i], 2);
        a[0][3] += Math.pow(x[i], 3);
        a[1][3] += Math.pow(x[i], 4);
        a[2][3] += Math.pow(x[i], 5);
        a[3][3] += Math.pow(x[i], 6);
    }
    a[1][0] = a[0][1];
    a[1][1] = a[0][2];
    a[1][2] = a[0][3];
    a[2][0] = a[1][1];
    a[2][1] = a[1][2];
    a[2][2] = a[1][3];
    a[3][0] = a[2][1];
    a[3][1] = a[2][2];
    a[3][2] = a[2][3];
    b[0] = 0;
    b[1] = 0;
    b[2] = 0;
    b[3] = 0;
    for(let i = 0; i < y.length; i++) {
        b[0] += y[i];
        b[1] += y[i] * x[i];
        b[2] += y[i] * Math.pow(x[i], 2);
        b[3] += y[i] * Math.pow(x[i], 3);
    }
    let coef = holeckiy(a, b);
    let y_tr = new Array();
    for(let i = 0; i < x.length; i++) {
        y_tr.push(get_y_tr(x[i]));
    }
    function get_y_tr(x) {
        return coef[0] + coef[1] * x + coef[2] * Math.pow(x, 2) + coef[3] * Math.pow(x, 3);
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