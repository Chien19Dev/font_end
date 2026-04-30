import { Fragment } from 'react';

export default function IntroduceYou() {
  return (
    <Fragment>
      <div className="mx-auto max-w-[900px] flex flex-col gap-3.5 md:px-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full h-full py-4">
        <h1 className="text-3xl font-bold mb-4">Chương trình giới thiệu bạn mới</h1>
        <p className="text-lg mb-6">
          Chia sẻ mã giới thiệu của bạn với bạn bè và nhận phần thưởng hấp dẫn khi họ đăng ký và mua
          sắm tại cửa hàng của chúng tôi!
        </p>
        <h2 className="text-2xl font-semibold mb-3">Cách thức hoạt động</h2>
        <ol className="list-decimal list-inside mb-6 space-y-2">
          <li>Chọn sản phẩm hoặc truy cập trang CoolClub để lấy mã hoặc link giới thiệu.</li>
          <li>Chia sẻ mã hoặc link với bạn bè.</li>
          <li>
            Bạn bè mua sắm với mã hoặc link của bạn sẽ được giảm 50k cho đơn hàng đầu tiên từ 200k.
          </li>
          <li>
            Bạn sẽ nhận 10% CoolCash theo giá trị đơn hàng sau 7 ngày từ khi đơn giao thành công.
          </li>
        </ol>
      </div>
    </Fragment>
  );
}
