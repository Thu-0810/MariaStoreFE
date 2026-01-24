import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  vi: {
    translation: {
      header: {
        search_placeholder: "Tìm kiếm",
        cart: "Giỏ Hàng",
        register: "Đăng Ký",
        login: "Đăng Nhập",
        account: "Tài khoản",
        requests: "Yêu cầu",
        orders: "Đơn hàng",
        saved_products: "Sản phẩm đã lưu",
        posts: "Bài viết",
        logout: "Đăng xuất",
        vietnamese: "Tiếng Việt",
        english: "English",
      },
      // footer
      footer: {
        intro: "GIỚI THIỆU",
        info: "THÔNG TIN",
        home: "Trang Chủ",
        order: "Đặt Hàng",
        store: "Cửa Hàng",
        blog: "Blog",
        contact: "Liên Hệ",
      },

      // nav
      nav: {
        home: "Trang Chủ",
        order_painting: "Đặt Tranh",
        store: "Cửa Hàng",
        community: "Cộng Đồng",
        contact: "Liên Hệ",

        manage_product: "Quản Lý Sản Phẩm",
        manage_customer: "Quản Lý Khách Hàng",
        manage_order: "Quản Lý Đơn Hàng",
        manage_commission: "Quản Lý Đặt Tranh",
        manage_post: "Quản Lý Bài Viết",

        more: "XEM THÊM",
        go_order: "ĐẾN MUA TRANH",
      },

      auth: {
        login_title: "Đăng nhập tài khoản",
        register_title: "Đăng ký tài khoản",

        email: "Email",
        password: "Mật khẩu",
        first_name: "Họ",
        last_name: "Tên",
        phone_optional: "Số điện thoại (Tùy chọn)",

        btn_login: "Đăng nhập",
        btn_register: "Đăng ký",

        forgot_password: "Quên mật khẩu ?",
        no_account: "Chưa có tài khoản?",
        register_now: "Đăng kí ngay",
        already_have_account: "Đã có tài khoản? Đăng nhập",

        // messages
        login_success: "Đăng nhập thành công!",
        login_success_but_no_profile:
          "Đăng nhập thành công nhưng không lấy được thông tin user",
        login_failed: "Email hoặc mật khẩu không đúng!",
        register_success: "Đăng ký thành công! Vui lòng đăng nhập.",

        // validations
        required_email: "Vui lòng nhập email!",
        invalid_email: "Email không đúng định dạng!",
        required_password: "Vui lòng nhập mật khẩu!",
        password_min_6: "Mật khẩu phải có ít nhất 6 ký tự!",
        required_first_name: "Vui lòng nhập họ!",
        required_last_name: "Vui lòng nhập tên!",
        invalid_phone: "Số điện thoại không hợp lệ!",

        // backend mapping
        email_exists: "Email đã tồn tại trong hệ thống",
      },

      order: {
        title: "Biểu Mẫu Đặt Tranh Tại MariaStore",
        subtitle: "Điền thông tin bên dưới để bắt đầu đặt hàng",

        order_name_optional: "Đặt tên cho đơn của bạn (tùy chọn):",
        order_detail: "Thông tin về đơn hàng của bạn:",
        contact_optional: "Cách thức liên lạc khác (Tùy chọn):",
        contact_value_optional:
          "Tên người dùng Twitter hoặc Email của bạn? (Tùy chọn)",
        note_check:
          "Vui lòng kiểm tra kỹ đơn đặt tranh trước khi nhấn hoàn thành.",

        twitter: "Twitter",
        email: "Email",

        painting_1: "Tranh Số 1",
        background: "Phần nền",

        style_1: "Phong cách 1: Tranh dạng tập trung nhiều vào đường nét",
        style_2: "Phong cách 2: Tranh dạng tập trung nhiều vào màu",
        style_3: "Phong cách 3: Tranh dạng Chibi",

        character: "Nhân vật",
        add_character: "Thêm nhân vật",

        draw_range: "Phạm vi vẽ trong tranh",
        bg_part: "Phần nền",
        unit_price: "Đơn giá",
        pay_now: "Thanh toán ngay",
        cancel: "Hủy",

        range: {
          dau: "Đầu",
          tu_nguc: "Từ ngực đổ lên",
          nua_nguoi: "Nửa người",
          tu_goi: "Từ đầu gối lên",
          ca_nguoi: "Cả người",
        },

        bg: {
          don_sac: "Đơn sắc",
          don_gian: "Đơn giản",
          trung_binh: "Trung bình",
          chi_tiet: "Chi tiết",
        },

        total: "Tổng tiền",
        order_btn: "Lưu Tranh",
        done_btn: "Hoàn thành",
        currency: "đ",
      },

      store: {
        sort_by: "Sắp xếp theo",
        clear_filter: "Bỏ lọc",

        sort: {
          newest: "Mới nhất",
          oldest: "Cũ nhất",
          a_z: "A-Z",
          z_a: "Z-A",
        },

        msg: {
          add_success: "Đã thêm vào giỏ hàng",
          add_failed:
            "Thêm vào giỏ thất bại (có thể bạn chưa đăng nhập hoặc sản phẩm hết hàng)",
        },

        misc: {
          no_image: "No image",
        },
      },

      cart: {
        title: "Giỏ hàng của bạn",
        empty: "Không có sản phẩm nào trong giỏ hàng của bạn",

        table: {
          product_info: "Thông tin sản phẩm",
          quantity: "Số lượng",
          unit_price: "Đơn giá",
          subtotal: "Thành tiền",
        },

        total: "Tổng tiền",
        checkout: "THANH TOÁN",
        continue_shopping: "Tiếp tục mua sắm",

        msg: {
          fetch_failed: "Không lấy được giỏ hàng. Bạn đã đăng nhập chưa?",
          qty_update_failed: "Cập nhật số lượng thất bại",
          remove_failed: "Xóa sản phẩm thất bại",
        },

        misc: {
          view_detail: "Xem chi tiết",
          no_image: "No image",
        },
      },

      checkout: {
        title: "Thông tin đơn hàng",
        receiver_name: "Họ và tên",
        receiver_phone: "Số điện thoại",
        shipping_address: "Địa chỉ nhận hàng",

        subtotal: "Tạm tính",
        discount: "Giảm giá",
        total: "Tổng tiền",

        pay: "THANH TOÁN",
        back: "Quay lại",

        msg_cart_empty: "Giỏ hàng trống",
        msg_missing_info: "Vui lòng nhập đầy đủ thông tin nhận hàng",
        msg_cart_load_failed: "Không tải được giỏ hàng",
        msg_checkout_failed: "Tạo đơn thất bại",
      },

      payment: {
        choose_title: "Chọn phương thức thanh toán",
        missing_order: "Thiếu thông tin đơn hàng, vui lòng checkout lại",
        not_integrated: "Chưa tích hợp phương thức này",

        methods: {
          paypal: "Paypal",
          vnpay: "VNPay",
          bank: "Tài khoản ngân hàng",
        },

        alt: {
          paypal: "Logo Paypal",
          vnpay: "Logo VNPay",
          bank: "Mã QR",
        },
      },

      qrPayment: {
        title: "Xác nhận thanh toán",
        shipping_info: "Thông tin nhận hàng",

        fetch_qr_failed: "Không lấy được QR",
        confirm_failed: "Xác nhận thanh toán thất bại",

        order_code: "Mã đơn hàng",
        amount: "Số tiền thanh toán",
        transaction_id: "Mã giao dịch",

        confirm_btn: "Xác nhận",
        back_btn: "Quay lại",

        currency: "đ",
      },

      productDetail: {
        type: "Loại sản phẩm",
        updating: "Đang cập nhật",
        description: "Miêu tả",
        price: "Giá tiền",
        quantity: "Số lượng",
        add_to_cart: "Thêm vào giỏ hàng",
        buy_now: "Mua ngay",

        detail_info: "Thông tin chi tiết",
        art_type: "Loại tranh",
        art_type_value: "Tranh kỹ thuật số (Digital Artwork)",
        file_format: "Định dạng file",
        file_format_value: "JPG độ phân giải cao",
        category: "Danh mục",
        status: "Trạng thái",

        rating: "Đánh giá",
        rating_suffix: "lượt",

        order_painting: "Đặt Tranh",

        msg_out_of_stock: "Sản phẩm đã hết hàng",
        msg_need_login: "Bạn cần đăng nhập để thêm vào giỏ",
        msg_add_success: "Đã thêm vào giỏ hàng",
        msg_add_failed: "Thêm vào giỏ thất bại",

        status_active: "Còn hàng",
        status_out_of_stock: "Hết hàng",
        status_display: "Hàng trưng bày",
        status_locked: "Đang khóa",
      },

      profile: {
        edit_info_btn: "Sửa Thông Tin",
        modal_title: "Chỉnh sửa thông tin hồ sơ",

        username: "Username",
        username_ph: "Username",

        account_name: "Tên tài khoản",
        account_name_ph: "Tên Tài Khoản",

        detail_info: "Thông tin chi tiết",
        detail_info_ph: "Thông Tin Chi Tiết",

        save: "Lưu",

        tab_request: "Yêu cầu",
        tab_orders: "Đơn hàng",
        tab_favorites: "Sản phẩm đã thích",
        tab_posts: "Bài viết",

        empty_request: "Tạm Thời Đặt Yêu Cầu Nào",
        empty_orders: "Danh sách đơn hàng của bạn",
        empty_favorites: "Các sản phẩm bạn đã yêu thích",
        empty_posts: "Bài viết của bạn sẽ xuất hiện ở đây",
        request: "Yêu cầu",
        request_default_title: "Yêu cầu đặt tranh",
        order: {
          sort_newest: "Gần nhất",
          sort_oldest: "Cũ nhất",

          orders_load_failed: "Tải danh sách đơn hàng thất bại",
          download_failed: "Tải file thất bại",

          empty_orders: "Danh sách đơn hàng của bạn",

          order: "Đơn hàng",
          order_completed: "Đơn hàng đã hoàn thành",
          order_code: "Đơn Hàng",
          order_total: "Tổng tiền",

          download: "Tải Xuống File",
        },
      },

      community: {
        title: "Cộng Đồng",
        subtitle:
          "Các chia sẻ về tranh vẽ được viết bởi những người yêu vẽ tranh",

        featured: "Bài Viết Nổi Bật",
        all_posts: "Tất Cả Bài Viết",
        other_posts: "Các Bài Viết Khác",

        empty_posts: "Chưa có bài viết.",
        load_failed: "Không tải được bài viết cộng đồng",

        post: {
          buy_at_mariastore: "Mua Tranh Tại Maria Store",
          emoji: "Biểu Tượng Cảm Xúc",
          stickers: "Nhãn Dán",
          chibi: "Chibi",
          animation: "Ảnh Động",
          portrait: "Tranh Chân Dung",
          avatars_2d: "2D Avatars",
        },
      },

      commission: {
        approve_title: "Duyệt yêu cầu đặt tranh",
        review_before_approve: "Vui lòng kiểm tra kỹ yêu cầu trước khi duyệt",

        approve: "Duyệt",
        reject: "Từ chối",

        enter_final_price: "Vui lòng nhập giá cuối cùng",
        approve_success: "Duyệt yêu cầu thành công",
        approve_fail: "Duyệt yêu cầu thất bại",
        reject_success: "Đã từ chối yêu cầu",
        reject_fail: "Từ chối yêu cầu thất bại",
        status: {
          draft: "Bản nháp",
          submitted: "Đã gửi",
          approved: "Đã duyệt",
          confirmed: "Đã thanh toán",
          rejected: "Từ chối",
          cancelled: "Đã hủy",
        },
      },

      sellerCommission: {
        title: "Quản Lý Đặt Tranh",

        table: {
          code: "Mã đặt tranh",
          contact: "Liên hệ",
          total_price: "Tổng tiền",
          status: "Trạng thái",
        },

        status: {
          pending: "Đang chờ duyệt",
        },

        contact: {
          email: "Email",
          twitter: "Twitter",
        },

        load_failed: "Không tải được danh sách đặt tranh",
      },

      detailCommunity: {
        fallback_title: "Tiêu đề bài viết",
        written_by: "Được viết bởi:",
        anonymous: "Ẩn danh",

        loading: "Đang tải...",
        toast_comment_added: "Đã thêm bình luận!",
        need_login_to_comment: "Bạn cần đăng nhập để bình luận",
        load_post_failed: "Không tải được bài viết",
        load_comments_failed: "Không tải được bình luận",
        add_comment_failed: "Thêm bình luận thất bại",

        show_comments: "Xem bình luận",
        hide_comments: "Ẩn bình luận",
        comments_title: "Bình luận",
        comment_placeholder: "Viết bình luận...",
      },

      contact: {
        title: "Liên hệ với chúng tôi",
        subtitle: "Liên hệ với chúng tôi qua:",
      },

      adminHome: {
        cards: {
          revenue_today: "Tổng Doanh Thu Hôm Nay",
          orders_today: "Số Đơn Đã Bán Hôm Nay",
          total_customers: "Tổng Số Khách Hàng",
          new_customers_today: "Khách Mới Trong Hôm Nay",
        },

        charts: {
          revenue_title: "Biểu đồ tổng doanh thu trong năm (chục triệu VNĐ)",
          device_title: "Tổng lượt đăng nhập theo thiết bị (nghìn lượt)",
          payment_title: "Tỷ lệ sử dụng phương thức thanh toán (nghìn lượt)",
          category_title:
            "Tổng lượng tranh đã bán theo từng danh mục (trăm tranh)",
        },

        period: {
          this_year: "Năm nay",
          last_year: "Năm ngoái",
        },

        legend: {
          this_year: "Năm nay",
          last_year: "Năm ngoái",
        },

        tooltip: {
          value: "Giá trị",
          quantity: "Số lượng",
          turns_suffix: "lượt",
          paintings_suffix: "tranh",
        },

        month: {
          m1: "Tháng 1",
          m2: "Tháng 2",
          m3: "Tháng 3",
          m4: "Tháng 4",
          m5: "Tháng 5",
          m6: "Tháng 6",
          m7: "Tháng 7",
          m8: "Tháng 8",
          m9: "Tháng 9",
        },
      },

      adminProduct: {
        title_manage: "Quản lý {{category}}",
        title_manage_default: "sản phẩm",
        search_placeholder: "Tìm kiếm...",

        btn_delete: "Xóa Sản Phẩm",
        btn_add: "Thêm Sản Phẩm",
        btn_lock: "Khóa Sản Phẩm",
        btn_unlock: "Mở Sản Phẩm",

        confirm_delete: "Xác nhận muốn xóa sản phẩm chứ?",
        confirm_lock: "Xác nhận muốn khóa sản phẩm chứ?",
        confirm_unlock: "Xác nhận muốn mở khóa sản phẩm chứ?",

        btn_cancel: "Hủy",
        btn_delete_ok: "Xóa",
        btn_lock_ok: "Khóa",
        btn_unlock_ok: "Mở",

        modal_create_title: "Thông Tin Sản Phẩm",
        modal_detail_title: "Chi Tiết Sản Phẩm",

        field: {
          name: "Tên",
          category: "Loại Tranh",
          status: "Tình Trạng",
          price: "Giá Tiền",
          description: "Miêu Tả",
          fileType: "Định Dạng File",
          size: "Kích Thước Gốc",
          fileSize: "Dung Lượng File",
          author: "Tác Giả",
          character: "Nhân Vật",
          origin: "Nguồn Gốc",
          style: "Phong Cách",
          extraInfo: "Thông Tin Thêm",
        },

        validation: {
          required_name: "Vui lòng nhập tên sản phẩm",
          required_category: "Vui lòng chọn loại sản phẩm",
          required_status: "Vui lòng chọn tình trạng",
          required_price: "Vui lòng nhập giá tiền",
        },

        table: {
          index: "STT",
          product_name: "Tên sản phẩm",
          quantity: "Số lượng",
          created_at: "Ngày nhập",
          price: "Giá tiền",
          status: "Tình trạng",
        },

        toast: {
          load_categories_failed: "Không tải được danh mục",
          load_products_failed: "Không tải được sản phẩm",

          create_success: "Thêm sản phẩm thành công",
          create_failed: "Thêm sản phẩm thất bại",

          update_success: "Cập nhật sản phẩm thành công",
          update_failed: "Cập nhật sản phẩm thất bại",

          delete_success: "Xóa sản phẩm thành công!",
          delete_failed: "Xóa sản phẩm thất bại",

          lock_success: "Đã khóa sản phẩm!",
          unlock_success: "Đã mở khóa sản phẩm!",
          lock_failed: "Khóa sản phẩm thất bại",
          action_failed: "Thao tác thất bại",

          select_one_for_delete: "Vui lòng chọn ít nhất một sản phẩm để xóa!",
          select_one_for_lock: "Vui lòng chọn ít nhất một sản phẩm để khóa!",
          select_one_for_action: "Vui lòng chọn ít nhất một sản phẩm!",
          invalid_image: "Vui lòng chọn ảnh hợp lệ!",
          load_detail_failed: "Không tải được chi tiết sản phẩm",
        },

        image: {
          add: "Thêm Ảnh",
          remove: "Xóa ảnh",
        },

        action: {
          edit: "Sửa Thông Tin",
          save: "Lưu Thông Tin",
          create: "Tạo mới",
        },
      },

      adminCustomer: {
        title_manage: "Quản lý {{category}}",
        title_manage_default: "khách hàng",
        search_placeholder: "Tìm kiếm...",
        filter_status: "Tình Trạng",

        status_active: "Hoạt động",
        status_locked: "Đã khóa",

        btn_delete: "Xóa Tài Khoản",
        btn_lock: "Khóa Tài Khoản",
        btn_unlock: "Mở Khóa Tài Khoản",

        confirm_delete: "Xác nhận muốn xóa tài khoản chứ?",
        confirm_lock: "Xác nhận muốn khóa tài khoản chứ?",
        confirm_unlock: "Xác nhận muốn mở khóa tài khoản chứ?",

        btn_cancel: "Hủy",
        btn_delete_ok: "Xóa",
        btn_lock_ok: "Khóa",
        btn_unlock_ok: "Mở khóa",

        toast: {
          update_success: "Cập nhật thông tin thành công!",
          delete_success: "Xóa tài khoản thành công!",
          lock_success: "Khóa tài khoản thành công!",
          select_one_for_delete: "Vui lòng chọn ít nhất một tài khoản để xóa!",
        },

        table: {
          index: "STT",
          display_name: "Tên hiển thị",
          birthday: "Ngày sinh",
          orders_count: "Số đơn đã mua",
          created_at: "Ngày tạo tài khoản",
          total_amount: "Tổng tiền",
        },

        detail: {
          btn_edit: "Sửa Thông Tin",
          btn_save: "Lưu Thông Tin",

          display_name: "Tên Hiển Thị",
          username: "Tên Người Dùng",
          phone: "Số Điện Thoại",
          gender: "Giới Tính",
          birthday: "Ngày Sinh",
          email: "Email",
          address: "Địa chỉ",

          gender_male: "Nam",
          gender_female: "Nữ",
          gender_other: "Khác",

          no_orders: "Chưa có đơn hàng",
          orders_stats: "Thống kê đơn hàng:",
          order_table: {
            index: "STT",
            order_number: "Mã đơn",
            order_date: "Ngày đặt",
            total: "Tổng tiền",
          },

          total_value: "Tổng Giá Trị",
        },
      },

      adminOrder: {
        title: "Quản lý đơn hàng",
        search_placeholder: "Tìm kiếm...",

        btn_delete: "Xóa Đơn Hàng",
        btn_edit: "Sửa đơn hàng",

        modal: {
          delete_confirm: "Xác nhận muốn xóa đơn hàng chứ?",
          detail_title_done: "Chi tiết đơn hàng (đã hoàn thành)",
          product_list: "Sản phẩm",
          total: "Tổng tiền",
          order_detail: "Chi tiết đơn hàng",
          invoice_code: "Mã Hóa Đơn",
          payment_method: "Phương Thức Thanh Toán",
          paid_time: "Thời Gian Thanh Toán",
        },

        btn: {
          delete: "Xóa",
          cancel: "Hủy",
          delete_invoice: "Xóa Hóa Đơn",
          print_invoice: "In Hóa Đơn",
        },

        toast: {
          select_one_for_delete: "Vui lòng chọn ít nhất một đơn hàng để xóa!",
          delete_success: "Xóa đơn hàng thành công!",
        },

        table: {
          index: "STT",
          order_code: "Mã đơn hàng",
          invoice_code: "Mã hóa đơn",
          payment_method: "Phương thức thanh toán",
          total_amount: "Tổng tiền",
          status: "Trạng thái đơn hàng",
        },

        status: {
          completed: "Hoàn thành",
          incomplete: "Chưa hoàn thành",
        },

        currency_suffix: "đ",
      },

      adminPost: {
        title: "Quản Lý Bài Viết",
        search_placeholder: "Tìm Kiếm...",

        btn_delete: "Xóa Bài Viết",
        btn_add: "Thêm Bài Viết",

        table: {
          index: "STT",
          post_name: "Tên bài viết",
          author: "Tác giả",
          username: "Username",
          created_at: "Ngày tạo",
        },

        modal: {
          delete_confirm: "Xác nhận muốn xóa bài viết chứ?",
        },

        toast: {
          select_one_for_delete: "Vui lòng chọn ít nhất một bài viết!",
          delete_success: "Xóa bài viết thành công!",
          load_posts_failed: "Không tải được danh sách bài viết",
          add_failed: "Thêm bài viết thất bại",
          update_failed: "Cập nhật bài viết thất bại",
        },

        common: {
          delete: "Xóa",
          cancel: "Hủy",
        },

        addModal: {
          title: "Thêm bài viết",
          cover_add: "+ Thêm Ảnh Bìa",
          post_title_label: "Tên Bài Viết*",
          author_label: "Tên Người Viết*",
          hashtag_label: "Hashtag*",
          btn_add: "Thêm Bài Viết",

          toast_required: "Vui lòng nhập đầy đủ thông tin!",
          toast_success: "Thêm bài viết thành công!",

          image_too_large: "Ảnh không được vượt quá 3MB",

          hashtag: {
            news: "#TinTuc",
            event: "#SuKien",
            review: "#Review",
          },
        },

        detailModal: {
          fallback_title: "Tiêu đề bài viết",
          date_prefix: "Ngày",
          written_by: "Được viết bởi:",
          anonymous: "Ẩn danh",

          edit_post: "Chỉnh sửa bài viết",
          show_comments: "Xem bình luận",
          hide_comments: "Ẩn bình luận",

          comments_title: "Bình luận",
          comment_placeholder: "Viết bình luận...",

          you: "Bạn",
          toast_comment_added: "Đã thêm bình luận!",

          comment_search_placeholder: "Tìm bình luận...",
          no_comments: "Chưa có bình luận.",
          date_na: "N/A",
        },

        editModal: {
          title: "Chỉnh sửa bài viết",
          btn_update: "Cập nhật bài viết",
          toast_required: "Vui lòng nhập đầy đủ thông tin!",
          toast_success: "Cập nhật bài viết thành công!",
        },
      },
    },
  },

  en: {
    translation: {
      // header
      header: {
        search_placeholder: "Search",
        cart: "Cart",
        register: "Sign up",
        login: "Sign in",
        account: "Account",
        requests: "Requests",
        orders: "Orders",
        saved_products: "Saved products",
        posts: "Posts",
        logout: "Logout",
        vietnamese: "Vietnamese",
        english: "English",
      },

      // footer
      footer: {
        intro: "ABOUT",
        info: "INFORMATION",
        home: "Home",
        order: "Order",
        store: "Store",
        blog: "Blog",
        contact: "Contact",
      },

      // nav
      nav: {
        home: "Home",
        order_painting: "Order",
        store: "Store",
        community: "Community",
        contact: "Contact",

        manage_product: "Manage Products",
        manage_customer: "Manage Customers",
        manage_order: "Manage Orders",
        manage_commission: "Manage Commissions",
        manage_post: "Manage Posts",

        more: "LOAD MORE",
        go_order: "GO ORDER",
      },

      auth: {
        login_title: "Sign in",
        register_title: "Create an account",

        email: "Email",
        password: "Password",
        first_name: "First name",
        last_name: "Last name",
        phone_optional: "Phone (Optional)",

        btn_login: "Sign in",
        btn_register: "Sign up",

        forgot_password: "Forgot password?",
        no_account: "Don't have an account?",
        register_now: "Sign up now",
        already_have_account: "Already have an account? Sign in",

        // messages
        login_success: "Signed in successfully!",
        login_success_but_no_profile:
          "Signed in but failed to fetch user profile",
        login_failed: "Incorrect email or password!",
        register_success: "Registered successfully! Please sign in.",

        // validations
        required_email: "Please enter your email!",
        invalid_email: "Invalid email format!",
        required_password: "Please enter your password!",
        password_min_6: "Password must be at least 6 characters!",
        required_first_name: "Please enter your first name!",
        required_last_name: "Please enter your last name!",
        invalid_phone: "Invalid phone number!",

        // backend mapping
        email_exists: "This email already exists",
      },

      order: {
        title: "Order Form - MariaStore",
        subtitle: "Fill in the information below to start your order",

        order_name_optional: "Name your order (optional):",
        order_detail: "Your order details:",
        contact_optional: "Other contact methods (optional):",
        contact_value_optional: "Your Twitter handle or Email (optional)",
        note_check: "Please double-check your order before finishing.",

        twitter: "Twitter",
        email: "Email",

        painting_1: "Painting #1",
        background: "Background",

        style_1: "Style 1: Line-focused illustration",
        style_2: "Style 2: Color-focused illustration",
        style_3: "Style 3: Chibi style",

        character: "Character",
        add_character: "Add character",

        draw_range: "Drawing range",
        bg_part: "Background",
        unit_price: "Unit price",
        pay_now: "Pay Now",
        cancel: "Cancel",

        range: {
          dau: "Head",
          tu_nguc: "From chest up",
          nua_nguoi: "Half body",
          tu_goi: "From knees up",
          ca_nguoi: "Full body",
        },

        bg: {
          don_sac: "Solid",
          don_gian: "Simple",
          trung_binh: "Medium",
          chi_tiet: "Detailed",
        },

        total: "Total",
        order_btn: "Save",
        done_btn: "Finish",
        currency: "₫",
      },

      cart: {
        title: "Your cart",
        empty: "There are no items in your cart",

        table: {
          product_info: "Product info",
          quantity: "Quantity",
          unit_price: "Unit price",
          subtotal: "Subtotal",
        },

        total: "Total",
        checkout: "CHECKOUT",
        continue_shopping: "Continue shopping",

        msg: {
          fetch_failed: "Failed to load cart. Are you logged in?",
          qty_update_failed: "Failed to update quantity",
          remove_failed: "Failed to remove item",
        },

        misc: {
          view_detail: "View details",
          no_image: "No image",
        },
      },

      checkout: {
        title: "Order information",
        receiver_name: "Full name",
        receiver_phone: "Phone number",
        shipping_address: "Shipping address",

        subtotal: "Subtotal",
        discount: "Discount",
        total: "Total",

        pay: "PAY",
        back: "Back",

        msg_cart_empty: "Your cart is empty",
        msg_missing_info: "Please fill in all shipping information",
        msg_cart_load_failed: "Failed to load cart",
        msg_checkout_failed: "Failed to create order",
      },

      payment: {
        choose_title: "Choose a payment method",
        missing_order: "Missing order information, please checkout again",
        not_integrated: "This payment method is not integrated yet",

        methods: {
          paypal: "Paypal",
          vnpay: "VNPay",
          bank: "Bank account",
        },

        alt: {
          paypal: "Paypal logo",
          vnpay: "VNPay logo",
          bank: "QR code",
        },
      },

      qrPayment: {
        title: "Confirm payment",
        shipping_info: "Shipping information",

        fetch_qr_failed: "Failed to load QR",
        confirm_failed: "Payment confirmation failed",

        order_code: "Order code",
        amount: "Amount",
        transaction_id: "Transaction ID",

        confirm_btn: "Confirm",
        back_btn: "Back",

        currency: "₫",
      },

      store: {
        sort_by: "Sort by:",
        clear_filter: "Clear filter",

        sort: {
          newest: "Newest",
          oldest: "Oldest",
          a_z: "A-Z",
          z_a: "Z-A",
        },

        msg: {
          add_success: "Added to cart",
          add_failed:
            "Failed to add to cart (you may not be logged in or the item is out of stock)",
        },

        misc: {
          no_image: "No image",
        },
      },

      productDetail: {
        type: "Product type",
        updating: "Updating",
        description: "Description",
        price: "Price",
        quantity: "Quantity",
        add_to_cart: "Add to cart",
        buy_now: "Buy now",

        detail_info: "Details",
        art_type: "Artwork type",
        art_type_value: "Digital artwork",
        file_format: "File format",
        file_format_value: "High-resolution JPG",
        category: "Category",
        status: "Status",

        rating: "Reviews",
        rating_suffix: "reviews",

        order_painting: "Order",

        msg_out_of_stock: "Out of stock",
        msg_need_login: "Please sign in to add to cart",
        msg_add_success: "Added to cart",
        msg_add_failed: "Failed to add to cart",

        status_active: "In stock",
        status_out_of_stock: "Out of stock",
        status_display: "Display item",
        status_locked: "Locked",
      },

      profile: {
        edit_info_btn: "Edit Profile",
        modal_title: "Edit profile information",

        username: "Username",
        username_ph: "Username",

        account_name: "Account name",
        account_name_ph: "Account name",

        detail_info: "Detailed info",
        detail_info_ph: "Detailed info",

        save: "Save",

        tab_request: "Requests",
        tab_orders: "Orders",
        tab_favorites: "Favorites",
        tab_posts: "Posts",

        empty_request: "No requests yet",
        empty_orders: "Your orders will appear here",
        empty_favorites: "Your favorite products will appear here",
        empty_posts: "Your posts will appear here",
        request: "Request",
        request_default_title: "Request Commission",
        order: {
          sort_newest: "Newest",
          sort_oldest: "Oldest",

          orders_load_failed: "Failed to load orders",
          download_failed: "Download failed",

          empty_orders: "Your orders will appear here",

          order: "Order",
          order_completed: "Order completed",
          order_code: "Order",
          order_total: "Total",

          download: "Download File",
        },
      },

      community: {
        title: "Community",
        subtitle: "Art sharing posts written by people who love drawing",

        featured: "Featured Posts",
        all_posts: "All Posts",
        other_posts: "Other Posts",

        empty_posts: "No posts yet.",
        load_failed: "Failed to load community posts",

        view_more: "VIEW MORE →",

        post: {
          buy_at_mariastore: "Buy paintings at MariaStore",
          emoji: "Emojis",
          stickers: "Stickers",
          chibi: "Chibi",
          animation: "Animation",
          portrait: "Portrait",
          avatars_2d: "2D Avatars",
        },
      },

      detailCommunity: {
        fallback_title: "Post title",
        written_by: "Written by:",
        anonymous: "Anonymous",

        loading: "Loading...",
        toast_comment_added: "Comment added!",
        need_login_to_comment: "Please sign in to comment",
        load_post_failed: "Failed to load post",
        load_comments_failed: "Failed to load comments",
        add_comment_failed: "Failed to add comment",

        show_comments: "Show comments",
        hide_comments: "Hide comments",
        comments_title: "Comments",
        comment_placeholder: "Write a comment...",
        you: "You",
      },

      contact: {
        title: "Contact us",
        subtitle: "Contact us via:",
      },

      commission: {
        approve_title: "Approve commission request",
        review_before_approve:
          "Please review the request carefully before approving",

        approve: "Approve",
        reject: "Reject",

        enter_final_price: "Please enter the final price",
        approve_success: "Commission approved successfully",
        approve_fail: "Failed to approve commission",
        reject_success: "Commission rejected",
        reject_fail: "Failed to reject commission",
        status: {
          draft: "DRAFT",
          submitted: "SUBMITTED",
          approved: "APPROVED",
          confirmed: "CONFIRMED",
          rejected: "REJECTED",
          cancelled: "CANCELLED",
        },
      },

      sellerCommission: {
        title: "Commission Management",

        table: {
          code: "Commission code",
          contact: "Contact",
          total_price: "Total price",
          status: "Status",
        },

        status: {
          pending: "Pending approval",
        },

        contact: {
          email: "Email",
          twitter: "Twitter",
        },

        load_failed: "Failed to load commission list",
      },

      adminHome: {
        cards: {
          revenue_today: "Total revenue today",
          orders_today: "Orders sold today",
          total_customers: "Total customers",
          new_customers_today: "New customers today",
        },

        charts: {
          revenue_title: "Total revenue in the year (tens of million VND)",
          device_title: "Logins by device (thousands)",
          payment_title: "Payment method usage (thousands)",
          category_title: "Paintings sold by category (hundreds)",
        },

        period: {
          this_year: "This year",
          last_year: "Last year",
        },

        legend: {
          this_year: "This year",
          last_year: "Last year",
        },

        tooltip: {
          value: "Value",
          quantity: "Quantity",
          turns_suffix: "times",
          paintings_suffix: "paintings",
        },

        month: {
          m1: "Jan",
          m2: "Feb",
          m3: "Mar",
          m4: "Apr",
          m5: "May",
          m6: "Jun",
          m7: "Jul",
          m8: "Aug",
          m9: "Sep",
        },
      },

      adminProduct: {
        title_manage: "Manage {{category}}",
        title_manage_default: "products",
        search_placeholder: "Search...",

        btn_delete: "Delete Products",
        btn_add: "Add Product",
        btn_lock: "Lock Product",
        btn_unlock: "Unlock Product",

        confirm_delete: "Are you sure you want to delete selected products?",
        confirm_lock: "Are you sure you want to lock this product?",
        confirm_unlock: "Are you sure you want to unlock this product?",

        btn_cancel: "Cancel",
        btn_delete_ok: "Delete",
        btn_lock_ok: "Lock",
        btn_unlock_ok: "Unlock",

        modal_create_title: "Product Information",
        modal_detail_title: "Product Details",

        field: {
          name: "Name",
          category: "Category",
          status: "Status",
          price: "Price",
          description: "Description",
          fileType: "File format",
          size: "Original size",
          fileSize: "File size",
          author: "Author",
          character: "Character",
          origin: "Origin",
          style: "Style",
          extraInfo: "Extra info",
        },

        validation: {
          required_name: "Please enter product name",
          required_category: "Please select a category",
          required_status: "Please select a status",
          required_price: "Please enter price",
        },

        table: {
          index: "STT",
          product_name: "Product name",
          quantity: "Quantity",
          created_at: "Created at",
          price: "Price",
          status: "Status",
        },

        toast: {
          load_categories_failed: "Failed to load categories",
          load_products_failed: "Failed to load products",

          create_success: "Product created successfully",
          create_failed: "Failed to create product",

          update_success: "Product updated successfully",
          update_failed: "Failed to update product",

          delete_success: "Deleted successfully!",
          delete_failed: "Delete failed",

          lock_success: "Locked successfully!",
          unlock_success: "Unlocked successfully!",
          lock_failed: "Lock failed",
          action_failed: "Action failed",

          select_one_for_delete:
            "Please select at least one product to delete!",
          select_one_for_lock: "Please select at least one product to lock!",
          select_one_for_action: "Please select at least one product!",
          invalid_image: "Please choose a valid image!",
          load_detail_failed: "Failed to load product details",
        },

        image: {
          add: "Add Image",
          remove: "Remove",
        },

        action: {
          edit: "Edit",
          save: "Save",
          create: "Create",
        },
      },

      adminCustomer: {
        title_manage: "Manage {{category}}",
        title_manage_default: "customers",
        search_placeholder: "Search...",
        filter_status: "Status",

        status_active: "Active",
        status_locked: "Locked",

        btn_delete: "Delete Account",
        btn_lock: "Lock Account",
        btn_unlock: "Unlock Account",

        confirm_delete: "Are you sure you want to delete this account?",
        confirm_lock: "Are you sure you want to lock this account?",
        confirm_unlock: "Are you sure you want to unlock this account?",

        btn_cancel: "Cancel",
        btn_delete_ok: "Delete",
        btn_lock_ok: "Lock",
        btn_unlock_ok: "Unlock",

        toast: {
          update_success: "Updated successfully!",
          delete_success: "Deleted successfully!",
          lock_success: "Locked successfully!",
          select_one_for_delete:
            "Please select at least one account to delete!",
        },

        table: {
          index: "STT",
          display_name: "Display name",
          birthday: "Birthday",
          orders_count: "Orders",
          created_at: "Created at",
          total_amount: "Total",
        },

        detail: {
          btn_edit: "Edit",
          btn_save: "Save",

          display_name: "Display name",
          username: "Username",
          phone: "Phone",
          gender: "Gender",
          birthday: "Birthday",
          email: "Email",
          address: "Address",

          gender_male: "Male",
          gender_female: "Female",
          gender_other: "Other",

          no_orders: "No orders yet",

          orders_stats: "Order summary:",
          order_table: {
            index: "#",
            order_number: "Order ID",
            order_date: "Date",
            total: "Total",
          },

          total_value: "Total value",
        },
      },

      adminOrder: {
        title: "Order management",
        search_placeholder: "Search...",

        btn_delete: "Delete Orders",
        btn_edit: "Edit order",

        modal: {
          delete_confirm: "Are you sure you want to delete selected orders?",
          detail_title_done: "Order details (completed)",
          product_list: "Products",
          total: "Total",
          order_detail: "Order details",
          invoice_code: "Invoice code",
          payment_method: "Payment method",
          paid_time: "Payment time",
        },

        btn: {
          delete: "Delete",
          cancel: "Cancel",
          delete_invoice: "Delete invoice",
          print_invoice: "Print invoice",
        },

        toast: {
          select_one_for_delete: "Please select at least one order to delete!",
          delete_success: "Deleted successfully!",
        },

        table: {
          index: "STT",
          order_code: "Order code",
          invoice_code: "Invoice code",
          payment_method: "Payment method",
          total_amount: "Total amount",
          status: "Order status",
        },

        status: {
          completed: "Completed",
          incomplete: "Incomplete",
        },

        currency_suffix: "₫",
      },

      adminPost: {
        title: "Post management",
        search_placeholder: "Search...",

        btn_delete: "Delete posts",
        btn_add: "Add post",

        table: {
          index: "#",
          post_name: "Post title",
          author: "Author",
          username: "Username",
          created_at: "Created at",
        },

        modal: {
          delete_confirm: "Are you sure you want to delete selected posts?",
        },

        toast: {
          select_one_for_delete: "Please select at least one post!",
          delete_success: "Deleted successfully!",
          load_posts_failed: "Failed to load posts",
          add_failed: "Failed to add post",
          update_failed: "Failed to update post",
        },

        common: {
          delete: "Delete",
          cancel: "Cancel",
        },

        addModal: {
          title: "Add post",
          cover_add: "+ Add cover image",
          post_title_label: "Post title*",
          author_label: "Author name*",
          hashtag_label: "Hashtag*",
          btn_add: "Add post",

          toast_required: "Please fill in all required fields!",
          toast_success: "Post added successfully!",

          image_too_large: "Image must not exceed 3MB",

          hashtag: {
            news: "#News",
            event: "#Event",
            review: "#Review",
          },
        },

        detailModal: {
          fallback_title: "Post title",
          date_prefix: "Date",
          written_by: "Written by:",
          anonymous: "Anonymous",

          edit_post: "Edit post",
          show_comments: "Show comments",
          hide_comments: "Hide comments",

          comments_title: "Comments",
          comment_placeholder: "Write a comment...",

          you: "You",
          toast_comment_added: "Comment added!",

          comment_search_placeholder: "Search comments...",
          no_comments: "No comments yet.",
          date_na: "N/A",
        },

        editModal: {
          title: "Edit post",
          btn_update: "Update post",
          toast_required: "Please fill in all required fields!",
          toast_success: "Post updated successfully!",
        },
      },
    },
  },
};

const savedLng = localStorage.getItem("lng") || "vi";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLng,
  fallbackLng: "vi",
  interpolation: { escapeValue: false },
});

export default i18n;