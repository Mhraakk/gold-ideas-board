import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1>این پرونده نیست</h1>
      <p className="card-lede">لینک اشتباه است یا بسته هنوز ساخته نشده.</p>
      <p style={{ marginTop: 16 }}>
        <Link className="btn" href="/">
          بازگشت به بورد
        </Link>
      </p>
    </div>
  );
}
