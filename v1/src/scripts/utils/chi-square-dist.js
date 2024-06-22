function gm_log(a) {
  var b, c, d, e, f;
  for (
    cft = [
      76.18009172947146, -86.50532032941678, 24.01409824083091,
      -1.231739572450155, 0.001208650973866179, -5395239384953e-18,
    ],
      c = b = a,
      d = b + 5.5,
      d -= (b + 0.5) * Math.log(d),
      e = 1.000000000190015,
      f = 0;
    5 >= f;
    f++
  )
    e += cft[f] / ++c;
  return -d + Math.log((2.5066282746310007 * e) / b);
}

function gm_s(a, b, c) {
  var g,
    h,
    i,
    j,
    k,
    d = 100,
    e = 3e-7;
  for (j = a, i = h = 1 / a, g = 1; d >= g; g++)
    if ((++j, (i *= b / j), (h += i), Math.abs(i) < Math.abs(h) * e))
      return (k = h * Math.exp(-b + a * Math.log(b) - c));
  return alert('Sorry, failed to find to a solution in gm_s'), -1;
}

function gm_c(a, b, c) {
  var g,
    h,
    i,
    j,
    k,
    l,
    m,
    d = 100,
    e = 3e-7,
    f = 1e-30;
  for (
    h = b + 1 - a, i = 1 / f, j = 1 / h, l = j, m = 1;
    d >= m &&
    ((g = -m * (m - a)),
    (h += 2),
    (j = g * j + h),
    f > Math.abs(j) && (j = f),
    (i = h + g / i),
    f > Math.abs(i) && (i = f),
    (j = 1 / j),
    (k = j * i),
    (l *= k),
    !(e > Math.abs(k - 1)));
    m++
  );
  return m > d
    ? (alert('Sorry, failed to find to a solution in gm_c'), -1)
    : Math.exp(-b + a * Math.log(b) - c) * l;
}

function gm_qb(a, b, c) {
  var d;
  if (a + 1 > b) {
    if (((d = gm_s(a, b, c)), 0 > d)) return -1;
    d = 1 - d;
  } else d = gm_c(a, b, c);
  return d;
}

function gm_qderiv(a, b, c) {
  var d;
  return (d = -b + (a - 1) * Math.log(b) - c), -Math.exp(d);
}

function gm_qinv(a, b) {
  var e,
    f,
    g,
    h,
    i,
    c = 20,
    d = 2e-8,
    j = gm_log(a);
  for (f = a + Math.sqrt(a) * (0.5 - b), e = 1; c >= e; e++) {
    if (((g = gm_qb(a, f, j)), 0 > g)) return -1;
    if (((g -= b), d > Math.abs(g))) return f;
    (h = gm_qderiv(a, f, j)), (i = g / h), (f -= i);
  }
  return alert('Sorry, failed to find to a solution in gm_qinv'), -1;
}

function chi2inv(a, b) {
  var c;
  return 0 >= a || a > 1
    ? (alert('p must be in the range (0,1]'), -1)
    : 1e-5 > Math.abs(a - 1)
    ? 0
    : 0 >= b || Math.floor(b) != b
    ? (alert('Degrees of freedom must be a positive integer'), -1)
    : ((c = gm_qinv(Math.floor(b) / 2, a)), 2 * c);
}

module.exports = {
  chi2inv,
};
