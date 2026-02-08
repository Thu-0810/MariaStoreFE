import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  vi: {
    translation: {
      common: {
        search: "Tìm",
        deleted: "Đã xoá",
        delete: "Xoá",
        cancel: "Hủy",
        preview: "Xem",
        remove: "Xóa",
        reset: "Đặt lại",
        download: "Tải xuống",
        download_failed: "Tải file thất bại",
        na: "N/A",
      },
      header: {
        search_placeholder: "Tìm kiếm",
        cart: "Giỏ Hàng",
        register: "Đăng Ký",
        login: "Đăng Nhập",
        account: "Tài khoản",
        requests: "Yêu cầu",
        orders: "Đơn hàng",
        favorite_products: "Sản phẩm đã thích",
        posts: "Bài viết",
        logout: "Đăng xuất",
        vietnamese: "Tiếng Việt",
        english: "English",
        notifications: "Thông báo",
        read_all: "Đánh dấu tất cả",
        loading_notifications: "Đang tải thông báo...",
        no_notifications: "Không có thông báo",
        no_notifications_hint: "Bạn sẽ nhận được thông báo mới ở đây",
        view_all_notifications: "Xem tất cả thông báo →",
        unread_count: "{{count}} thông báo chưa đọc",
      },
      footer: {
        intro: "GIỚI THIỆU",
        info: "THÔNG TIN",
        home: "Trang Chủ",
        order: "Đặt Hàng",
        store: "Cửa Hàng",
        blog: "Blog",
        contact: "Liên Hệ",
      },

      nav: {
        home: "Trang Chủ",
        order_painting: "Đặt Tranh",
        store: "Cửa Hàng",
        community: "Cộng Đồng",
        contact: "Liên Hệ",

        manage_product: "Quản Lý Sản Phẩm",
        manage_customer: "Quản Lý Tài Khoản",
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

        login_success: "Đăng nhập thành công!",
        login_success_but_no_profile:
          "Đăng nhập thành công nhưng không lấy được thông tin user",
        login_failed: "Email hoặc mật khẩu không đúng!",
        register_success: "Đăng ký thành công! Vui lòng đăng nhập.",

        required_email: "Vui lòng nhập email!",
        invalid_email: "Email không đúng định dạng!",
        required_password: "Vui lòng nhập mật khẩu!",
        password_min_6: "Mật khẩu phải có ít nhất 6 ký tự!",
        required_first_name: "Vui lòng nhập họ!",
        required_last_name: "Vui lòng nhập tên!",
        invalid_phone: "Số điện thoại không hợp lệ!",

        email_exists: "Email đã tồn tại trong hệ thống",

        forgot_password_title: "Quên mật khẩu",
        forgot_password_desc: "Nhập email để nhận liên kết đặt lại mật khẩu.",
        email_placeholder: "Nhập email của bạn",
        btn_send_reset_link: "Gửi liên kết đặt lại",
        back_to_login: "Quay lại đăng nhập",

        reset_link_sent: "Nếu email tồn tại, liên kết đã được gửi.",
        reset_link_send_failed: "Gửi liên kết thất bại, vui lòng thử lại.",

        reset_password_title: "Đặt lại mật khẩu",
        reset_password_desc: "Nhập mật khẩu mới để cập nhật tài khoản.",
        new_password: "Mật khẩu mới",
        new_password_placeholder: "Nhập mật khẩu mới",
        confirm_password: "Xác nhận mật khẩu",
        confirm_password_placeholder: "Nhập lại mật khẩu mới",
        btn_reset_password: "Đặt lại mật khẩu",

        reset_token_missing: "Thiếu token đặt lại mật khẩu.",
        reset_token_invalid: "Liên kết đặt lại không hợp lệ hoặc đã hết hạn.",
        go_to_forgot_password: "Quay lại trang quên mật khẩu",

        reset_password_success:
          "Đặt lại mật khẩu thành công! Vui lòng đăng nhập.",
        reset_password_failed: "Đặt lại mật khẩu thất bại, vui lòng thử lại.",
        required_confirm_password: "Vui lòng xác nhận mật khẩu!",
        password_not_match: "Mật khẩu xác nhận không khớp!",

        verify_email_title: "Xác minh email",
        verify_email_desc: "Chúng tôi đang xác minh email của bạn.",
        verifying: "Đang xác minh...",

        verify_email_success: "Xác minh email thành công!",
        verify_email_failed: "Xác minh email thất bại!",

        verify_email_success_text: "Email đã được xác minh.",
        verify_email_success_hint: "Bạn có thể đăng nhập ngay bây giờ.",

        verify_email_failed_text: "Không thể xác minh email.",
        verify_email_failed_hint:
          "Liên kết có thể đã hết hạn hoặc không hợp lệ.",
        verify_email_missing_token: "Thiếu token xác minh email.",

        go_to_register: "Đến trang đăng ký",
      },

      order: {
        title: "Biểu Mẫu Đặt Tranh Tại MariaStore",
        subtitle: "Điền thông tin bên dưới để bắt đầu đặt hàng",
        required_order_name: "Vui lòng nhập tên đơn",

        order_name_optional: "Đặt tên cho đơn của bạn (tùy chọn):",
        order_detail: "Thông tin về đơn hàng của bạn:",
        contact_optional: "Cách thức liên lạc khác (Tùy chọn):",
        contact_value_optional:
          "Tên người dùng Twitter hoặc Email của bạn? (Tùy chọn)",
        note_check:
          "Vui lòng kiểm tra kỹ đơn đặt tranh trước khi nhấn hoàn thành.",
        title_required: "Vui lòng nhập tiêu đề đơn",
        style_required: "Vui lòng chọn style",
        need_character: "Vui lòng thêm ít nhất 1 nhân vật",
        amount_to_pay: "Số tiền cần thanh toán",
        order_not_ready: "Đơn hàng chưa sẵn sàng",
        payment_confirmed: "Đã xác nhận thanh toán",
        payment_confirm_failed: "Xác nhận thanh toán thất bại",
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
          "don-sac": "Đơn sắc",
          "don-gian": "Đơn giản",
          "trung-binh": "Trung bình",
          "chi-tiet": "Chi tiết",
        },

        total: "Tổng tiền",
        order_btn: "Lưu Tranh",
        done_btn: "Hoàn thành",
        currency: "đ",
      },

      store: {
        sort_by: "Sắp xếp theo",
        clear_filter: "Bỏ lọc",
        hero_alt: "Ảnh banner cửa hàng",
        product_alt: "Sản phẩm",
        category_alt: "Danh mục",
        category_filter_title: "Lọc theo: {{category}}",
        add_to_cart: "Thêm vào giỏ",

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
            load_categories_failed: "Không tải được danh mục.",
    load_products_failed: "Không tải được danh sách sản phẩm.",
        },

        misc: {
          no_image: "Không có ảnh",
          no_products: "Không có sản phẩm nào.",

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
          no_image: "Không có ảnh",
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
        paypal_return: {
          verifying: "Đang xác nhận thanh toán PayPal...",
          capturing: "Đang capture PayPal...",
          missing_order_id: "Không tìm thấy orderId để capture.",
          success_toast: "Thanh toán PayPal thành công!",
          success_redirecting: "Thanh toán thành công! Đang chuyển trang...",
          capture_failed: "Capture PayPal thất bại. Vui lòng kiểm tra lại.",
        },
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
        qr_value: "Nội dung QR",
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

        msg_liked: "Đã thích",
        msg_unliked: "Đã bỏ thích",

        write_review: "Đánh giá của bạn",
        your_rating: "Số sao",
        review_placeholder: "Viết cảm nhận của bạn...",
        submit_review: "Gửi đánh giá",
        submitting: "Đang gửi...",
        clear: "Xóa",

        msg_choose_star: "Vui lòng chọn số sao",
        msg_review_success: "Đã gửi đánh giá",
        msg_review_failed: "Gửi đánh giá thất bại",

        chat_with_seller: "Chat với seller",
        delete_review: "Xóa đánh giá",
        msg_review_deleted: "Đã xóa đánh giá",

        log_fetch_failed: "Fetch product detail failed",
        msg_load_failed: "Không tải được chi tiết sản phẩm",
        msg_chat_failed: "Không tạo được cuộc trò chuyện",

        deleting: "Đang xóa...",
        msg_review_delete_failed: "Xóa đánh giá thất bại",
        review_login_required: "Vui lòng đăng nhập để đánh giá.",

        sample: {
          title: "Tranh do {{handle}} đặt hàng",
          alt: "Mẫu đặt tranh {{index}}",
        },
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
      
        full_name: "Họ và tên",
        full_name_ph: "Nhập họ và tên",
      
        phone: "Số điện thoại",
        phone_ph: "Nhập số điện thoại",
      
        gender: "Giới tính",
        gender_ph: "Chọn giới tính",
        gender_male: "Nam",
        gender_female: "Nữ",
        gender_other: "Khác",
      
        dob: "Ngày sinh",
        dob_ph: "Chọn ngày sinh",
      
        address: "Địa chỉ",
        address_ph: "Nhập địa chỉ",
      
        saving: "Đang lưu...",
        saved_success: "Lưu thông tin thành công",
        saved_failed: "Lưu thất bại, thử lại sau",
      
        avatar_updated: "Cập nhật avatar thành công",
        avatar_update_failed: "Upload avatar thất bại",
      
        posts_search_ph: "Tìm bài viết...",
        create_post: "Tạo bài viết",
        by: "Bởi",
      
        load_failed: "Không lấy được thông tin user. Vui lòng đăng nhập lại.",
      
        avatar_change_btn: "Đổi avatar",
        avatar_hint: "Nhấn biểu tượng ✎ để chọn ảnh mới",
      
        info_title: "Thông tin cá nhân",
        change_password_title: "Đổi mật khẩu",
      
        current_password: "Mật khẩu hiện tại",
        current_password_ph: "Nhập mật khẩu hiện tại",
        new_password: "Mật khẩu mới",
        new_password_ph: "Nhập mật khẩu mới",
        confirm_new_password: "Xác nhận mật khẩu mới",
        confirm_new_password_ph: "Nhập lại mật khẩu mới",
      
        change_password_btn: "Đổi mật khẩu",
      
        avatar_alt: "Avatar",
        background_alt: "Ảnh nền hồ sơ",
      
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
        id_not_found: "Không tìm thấy commissionId",

        approve: "Duyệt",
        reject: "Từ chối",

        enter_final_price: "Vui lòng nhập giá cuối cùng",
        approve_success: "Duyệt yêu cầu thành công",
        approve_fail: "Duyệt yêu cầu thất bại",
        reject_success: "Đã từ chối yêu cầu",
        reject_fail: "Từ chối yêu cầu thất bại",
        deliverables_title: "Ảnh từ người bán",
        upload_image: "Thêm ảnh",
        upload_now: "Xác nhận thêm ảnh",
        upload_success: "Thêm ảnh thành công",
        upload_failed: "Thêm ảnh thất bại",
        delete_success: "Xóa ảnh thành công",
        delete_failed: "Xóa ảnh thất bại",
        no_deliverables_yet: "Chưa có dữ liệu",
        status: {
          draft: "Bản nháp",
          submitted: "Đã gửi",
          approved: "Đã duyệt",
          paid: "Đã thanh toán",
          rejected: "Từ chối",
          cancelled: "Đã hủy",
        },
        locked_no_upload: "Yêu cầu đã khóa, không thể upload thêm.",
        deliverables_locked: "Đã khóa",
        deliverable_alt: "Ảnh",

        final_price: "Giá chốt",
        final_price_hint: "Giá seller chốt với khách. Có thể khác giá gợi ý.",
        suggested_price: "Giá gợi ý",
        higher_than_suggested: "Cao hơn",
        lower_than_suggested: "Thấp hơn",
        same_as_suggested: "Bằng giá gợi ý",
        use_suggested: "Dùng giá gợi ý",
        plus_50k: "+50k",
        minus_50k: "-50k",
        final_price_note: "Giá chốt phải > 0 để duyệt.",
        final_price_label: "Giá chốt (seller)",
        final_price_pending:
          "Chưa có giá chốt. Seller sẽ chốt giá sau khi duyệt.",

        draft_saved: "Đã lưu draft",
        draft_save_failed: "Lưu draft thất bại",
        submitted: "Đã gửi yêu cầu, chờ seller duyệt",
        submit_failed: "Gửi yêu cầu thất bại",
        save_draft: "Lưu draft",
        submit: "Gửi yêu cầu",

        deliverables_locked_until_paid: "Chỉ xem ảnh sau khi đã thanh toán.",
      },

      sellerCommission: {
        title: "Quản Lý Đặt Tranh",
        only_submitted_can_approve:
          "Chỉ commission ở trạng thái SUBMITTED mới có thể duyệt.",
        code_fallback: "CM-{{id}}",

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
          total_products: "Số sản phẩm",
          total_users: "Số tài khoản",
          total_posts: "Số bài viết",
          total_orders: "Số đơn hàng",
          total_revenue: "Tổng doanh thu",
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
          products_suffix: "sản phẩm",
        },

        payment: {
          bank: "Ngân hàng",
          paypal: "Paypal",
          vnpay: "VNPay",
          unknown: "Khác",
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
          m10: "Tháng 10",
          m11: "Tháng 11",
          m12: "Tháng 12",
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
          update_failed: "Cập nhật thất bại",
          delete_failed: "Xóa thất bại",

          load_users_failed:
            "Không tải được danh sách user (kiểm tra token/role ADMIN).",
          load_orders_failed: "Không tải được danh sách đơn hàng.",

          unlock_success: "Mở khóa tài khoản thành công!",
          select_one_for_lock: "Vui lòng chọn ít nhất một tài khoản để khóa!",
          lock_selected_success: "Đã khóa các tài khoản đã chọn",
          lock_failed: "Khóa/Mở khóa thất bại.",
          missing_user_id: "Không tìm thấy userId để upload avatar.",
          avatar_upload_success: "Cập nhật avatar thành công!",
          avatar_upload_no_url:
            "Upload thành công nhưng không nhận được avatarUrl.",
          avatar_upload_failed:
            "Upload avatar thất bại. Kiểm tra quyền ADMIN hoặc API.",
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

          gender_ph: "Chọn giới tính",
          birthday_ph: "Chọn ngày sinh",
          avatar_alt: "Avatar",
          upload_avatar: "Tải lên avatar",

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
        toast: {
          load_failed: "Không tải được danh sách đơn hàng",
          load_detail_failed: "Không tải được chi tiết đơn hàng",
          delete_failed: "Xóa đơn hàng thất bại",
          print_invoice_failed: "In hóa đơn thất bại",
        },
        modal: {
          delete_confirm: "Xác nhận muốn xóa đơn hàng chứ?",
          detail_title_done: "Chi tiết đơn hàng (đã hoàn thành)",
          product_list: "Sản phẩm",
          total: "Tổng tiền",
          order_detail: "Chi tiết đơn hàng",
          invoice_code: "Mã Hóa Đơn",
          payment_method: "Phương Thức Thanh Toán",
          paid_time: "Thời Gian Thanh Toán",
          file_format: "{{format}} File",
          qty_prefix: "x{{count}}",
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
          search: "Tìm",
          deleted: "Đã xoá",
          delete: "Xoá",
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
      common: {
        search: "Search",
        deleted: "Deleted",
        delete: "Delete",
        cancel: "Cancel",
        preview: "Preview",
        remove: "Remove",
        reset: "Reset",
        download: "Download",
        download_failed: "Download failed",
        na: "N/A",
      },
      header: {
        search_placeholder: "Search",
        cart: "Cart",
        register: "Sign up",
        login: "Sign in",
        account: "Account",
        requests: "Requests",
        orders: "Orders",
        favorite_products: "Favorite products",
        posts: "Posts",
        logout: "Logout",
        vietnamese: "Vietnamese",
        english: "English",
        notifications: "Notifications",
        read_all: "Mark all as read",
        loading_notifications: "Loading notifications...",
        no_notifications: "No notifications",
        no_notifications_hint: "New notifications will appear here",
        view_all_notifications: "View all notifications →",
        unread_count: "{{count}} unread notifications",
      },

      footer: {
        intro: "ABOUT",
        info: "INFORMATION",
        home: "Home",
        order: "Order",
        store: "Store",
        blog: "Blog",
        contact: "Contact",
      },

      nav: {
        home: "Home",
        order_painting: "Order",
        store: "Store",
        community: "Community",
        contact: "Contact",

        manage_product: "Manage Products",
        manage_customer: "Manage Account",
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

        login_success: "Signed in successfully!",
        login_success_but_no_profile:
          "Signed in but failed to fetch user profile",
        login_failed: "Incorrect email or password!",
        register_success: "Registered successfully! Please sign in.",

        required_email: "Please enter your email!",
        invalid_email: "Invalid email format!",
        required_password: "Please enter your password!",
        password_min_6: "Password must be at least 6 characters!",
        required_first_name: "Please enter your first name!",
        required_last_name: "Please enter your last name!",
        invalid_phone: "Invalid phone number!",

        email_exists: "This email already exists",

        forgot_password_title: "Forgot password",
        forgot_password_desc:
          "Enter your email to receive a password reset link.",
        email_placeholder: "Enter your email",
        btn_send_reset_link: "Send reset link",
        back_to_login: "Back to sign in",

        reset_link_sent: "If the email exists, the reset link has been sent.",
        reset_link_send_failed: "Failed to send reset link. Please try again.",

        reset_password_title: "Reset password",
        reset_password_desc: "Enter a new password to update your account.",
        new_password: "New password",
        new_password_placeholder: "Enter new password",
        confirm_password: "Confirm password",
        confirm_password_placeholder: "Re-enter new password",
        btn_reset_password: "Reset password",

        reset_token_missing: "Missing reset token.",
        reset_token_invalid: "Reset link is invalid or expired.",
        go_to_forgot_password: "Go to forgot password",

        reset_password_success: "Password reset successful! Please sign in.",
        reset_password_failed: "Password reset failed. Please try again.",
        required_confirm_password: "Please confirm your password!",
        password_not_match: "Passwords do not match!",

        verify_email_title: "Verify email",
        verify_email_desc: "We are verifying your email address.",
        verifying: "Verifying...",

        verify_email_success: "Email verified successfully!",
        verify_email_failed: "Email verification failed!",

        verify_email_success_text: "Your email has been verified.",
        verify_email_success_hint: "You can sign in now.",

        verify_email_failed_text: "Unable to verify email.",
        verify_email_failed_hint: "The link may be invalid or expired.",
        verify_email_missing_token: "Missing email verification token.",

        go_to_register: "Go to sign up",
      },

      order: {
        title: "Order Form - MariaStore",
        subtitle: "Fill in the information below to start your order",
        required_order_name: "Please enter the order name",

        order_name_optional: "Name your order (optional):",
        order_detail: "Your order details:",
        contact_optional: "Other contact methods (optional):",
        contact_value_optional: "Your Twitter handle or Email (optional)",
        note_check: "Please double-check your order before finishing.",
        title_required: "Please enter a title",
        style_required: "Please choose a style",
        need_character: "Please add at least one character",
        amount_to_pay: "Amount to pay",
        order_not_ready: "Order is not ready",
        payment_confirmed: "Payment confirmed",
        payment_confirm_failed: "Payment confirmation failed",

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
          "don-sac": "Solid",
          "don-gian": "Simple",
          "trung-binh": "Medium",
          "chi-tiet": "Detailed",
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
        paypal_return: {
          verifying: "Verifying PayPal payment...",
          capturing: "Capturing PayPal...",
          missing_order_id: "OrderId not found for capture.",
          success_toast: "PayPal payment successful!",
          success_redirecting: "Payment successful! Redirecting...",
          capture_failed: "PayPal capture failed. Please try again.",
        },
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
        qr_value: "QR value",
      },

      store: {
        sort_by: "Sort by:",
        clear_filter: "Clear filter",
        hero_alt: "Store banner",
        product_alt: "Product",
        category_alt: "Category",
        category_filter_title: "Filter by: {{category}}",

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
            load_categories_failed: "Failed to load categories.",
            load_products_failed: "Failed to load products.",
        },

        misc: {
          no_image: "No image",
          no_products: "No products found.",
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

        msg_liked: "Liked",
        msg_unliked: "Unliked",

        write_review: "Your review",
        your_rating: "Stars",
        review_placeholder: "Write your feedback...",
        submit_review: "Submit review",
        submitting: "Submitting...",
        clear: "Clear",

        msg_choose_star: "Please choose a star rating",
        msg_review_success: "Review submitted",
        msg_review_failed: "Failed to submit review",

        chat_with_seller: "Chat with seller",
        delete_review: "Delete review",
        msg_review_deleted: "Review deleted",

        log_fetch_failed: "Fetch product detail failed",
        msg_load_failed: "Failed to load product details",
        msg_chat_failed: "Failed to create conversation",

        deleting: "Deleting...",
        msg_review_delete_failed: "Failed to delete review",
        review_login_required: "Please sign in to write a review.",

        sample: {
          title: "Artwork commissioned by {{handle}}",
          alt: "Commission sample {{index}}",
        },
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
        full_name: "Full name",
        full_name_ph: "Enter full name",

        phone: "Phone number",
        phone_ph: "Enter phone number",

        gender: "Gender",
        gender_ph: "Select gender",
        gender_male: "Male",
        gender_female: "Female",
        gender_other: "Other",

        dob: "Date of birth",
        dob_ph: "Select date of birth",

        address: "Address",
        address_ph: "Enter address",

        saving: "Saving...",
        saved_success: "Profile updated successfully",
        saved_failed: "Update failed, please try again",

        avatar_updated: "Avatar updated successfully",
        avatar_update_failed: "Avatar upload failed",
        posts_search_ph: "Search posts...",
        create_post: "Create post",
        by: "By",
        load_failed: "Failed to load user info. Please sign in again.",

avatar_change_btn: "Change avatar",
avatar_hint: "Click ✎ to choose a new image",

info_title: "Personal information",
change_password_title: "Change password",

current_password: "Current password",
current_password_ph: "Enter current password",
new_password: "New password",
new_password_ph: "Enter new password",
confirm_new_password: "Confirm new password",
confirm_new_password_ph: "Re-enter new password",

change_password_btn: "Change password",

avatar_alt: "Avatar",
background_alt: "Profile background",
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
        toast_comment_added: "Comment added!",

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
        id_not_found: "Commission ID not found",

        approve: "Approve",
        reject: "Reject",

        enter_final_price: "Please enter the final price",
        approve_success: "Commission approved successfully",
        approve_fail: "Failed to approve commission",
        reject_success: "Commission rejected",
        reject_fail: "Failed to reject commission",
        deliverables_title: "Deliverables",
        upload_image: "Upload",
        upload_now: "Confirm",
        upload_success: "Upload Success",
        upload_failed: "Upload Failed",
        delete_success: "Delete Success",
        delete_failed: "Delete Failed",
        no_deliverables_yet: "No Data",
        status: {
          draft: "DRAFT",
          submitted: "SUBMITTED",
          approved: "APPROVED",
          paid: "PAID",
          rejected: "REJECTED",
          cancelled: "CANCELLED",
        },
        locked_no_upload:
          "This request is locked. You cannot upload more files.",
        deliverables_locked: "Locked",
        deliverable_alt: "Deliverable",

        final_price: "Final price",
        final_price_hint:
          "Seller final price. It may differ from the suggested price.",
        suggested_price: "Suggested price",
        higher_than_suggested: "Higher",
        lower_than_suggested: "Lower",
        same_as_suggested: "Same as suggested",
        use_suggested: "Use suggested price",
        plus_50k: "+50k",
        minus_50k: "-50k",
        final_price_note: "Final price must be > 0 to approve.",
        final_price_label: "Final price (seller)",
        final_price_pending:
          "Final price is not available yet. The seller will set it after approval.",

        draft_saved: "Draft saved",
        draft_save_failed: "Failed to save draft",
        submitted: "Request submitted. Waiting for seller approval.",
        submit_failed: "Failed to submit request",
        save_draft: "Save draft",
        submit: "Submit",

        deliverables_locked_until_paid:
          "Deliverables are available after payment.",
      },

      sellerCommission: {
        title: "Commission Management",
        only_submitted_can_approve:
          "Only commissions in SUBMITTED status can be approved.",
        code_fallback: "CM-{{id}}",

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

          total_products: "Total products",
          total_users: "Total users",
          total_posts: "Total posts",
          total_orders: "Total orders",
          total_revenue: "Total revenue",
        },

        charts: {
          revenue_title: "Total revenue in the year (tens of million VND)",
          device_title: "Logins by device (thousands)",
          payment_title: "Payment method usage (thousands)",
          category_title: "Paintings sold by category (hundreds)",
        },

        period: { this_year: "This year", last_year: "Last year" },
        legend: { this_year: "This year", last_year: "Last year" },

        tooltip: {
          value: "Value",
          quantity: "Quantity",
          turns_suffix: "times",
          paintings_suffix: "paintings",
          products_suffix: "products",
        },

        payment: {
          bank: "Bank",
          paypal: "Paypal",
          vnpay: "VNPay",
          unknown: "Other",
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
          m10: "Oct",
          m11: "Nov",
          m12: "Dec",
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
          update_failed: "Update failed",
          delete_failed: "Delete failed",

          load_users_failed: "Failed to load users (check ADMIN token/role).",
          load_orders_failed: "Failed to load orders.",

          unlock_success: "Account unlocked successfully!",
          select_one_for_lock: "Please select at least one account to lock!",
          lock_selected_success: "Locked selected accounts",
          lock_failed: "Lock/Unlock failed.",
          missing_user_id: "Missing userId for avatar upload.",
          avatar_upload_success: "Avatar updated successfully!",
          avatar_upload_no_url: "Uploaded but no avatarUrl returned.",
          avatar_upload_failed:
            "Avatar upload failed. Check ADMIN permission or API.",
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

          gender_ph: "Select gender",
          birthday_ph: "Select date of birth",
          avatar_alt: "Avatar",
          upload_avatar: "Upload avatar",

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
        toast: {
          load_failed: "Failed to load orders",
          load_detail_failed: "Failed to load order details",
          delete_failed: "Failed to delete orders",
          print_invoice_failed: "Failed to print invoice",
        },
        modal: {
          delete_confirm: "Are you sure you want to delete selected orders?",
          detail_title_done: "Order details (completed)",
          product_list: "Products",
          total: "Total",
          order_detail: "Order details",
          invoice_code: "Invoice code",
          payment_method: "Payment method",
          paid_time: "Payment time",
          file_format: "{{format}} File",
          qty_prefix: "x{{count}}",
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
          search: "Search",
          deleted: "Deleted",
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