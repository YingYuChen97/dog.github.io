.community-page{
    background:linear-gradient(180deg,#fff7f0 0%,#f8f9fa 220px);
    min-height:calc(100vh - 140px);
    padding:28px 16px 48px;
}

.community-wrap{
    width:100%;
    max-width:520px;
    margin:0 auto;
}

.community-hero{
    text-align:center;
    margin-bottom:22px;
}

.community-hero h2{
    color:#ff7b00;
    font-size:28px;
    margin-bottom:6px;
}

.community-hero p{
    color:#777;
    font-size:15px;
}

.composer,.post-card{
    background:white;
    border:1px solid #ececec;
    border-radius:14px;
    box-shadow:0 6px 18px rgba(0,0,0,.06);
    margin-bottom:22px;
    overflow:hidden;
}

.composer{
    padding:18px;
}

.composer h3{
    font-size:17px;
    color:#444;
    margin-bottom:12px;
}

.composer-locked{
    color:#777;
    font-size:14px;
    line-height:1.6;
}

.composer-locked a{
    color:#ff7b00;
    font-weight:bold;
    text-decoration:none;
}

.composer .form-row{
    margin-bottom:12px;
}

.composer label{
    display:block;
    font-size:13px;
    font-weight:bold;
    color:#555;
    margin-bottom:5px;
}

.composer input,
.composer select,
.composer textarea{
    width:100%;
    border:1px solid #ddd;
    border-radius:10px;
    padding:10px 12px;
    font:inherit;
    font-size:15px;
    background:white;
}

.composer textarea{
    min-height:78px;
    resize:vertical;
}

.composer-actions{
    display:flex;
    flex-wrap:wrap;
    gap:10px;
    align-items:center;
    margin-top:8px;
}

.composer-actions .hint{
    color:#999;
    font-size:12px;
}

.btn-post{
    border:none;
    background:#ff914d;
    color:white;
    border-radius:999px;
    padding:10px 20px;
    font:inherit;
    font-weight:bold;
    cursor:pointer;
}

.btn-post:disabled{
    opacity:.65;
    cursor:wait;
}

.preview-box{
    margin-top:8px;
    border-radius:10px;
    overflow:hidden;
    display:none;
    border:1px solid #eee;
}

.preview-box.show{
    display:block;
}

.preview-box img{
    width:100%;
    max-height:280px;
    object-fit:cover;
    display:block;
}

.msg{
    display:none;
    border-radius:8px;
    padding:10px 12px;
    margin-bottom:12px;
    font-size:14px;
}

.msg.show{ display:block; }
.msg.ok{ background:#eefaf1; color:#1e7e34; border:1px solid #c3e6cb; }
.msg.err{ background:#fff0f0; color:#c0392b; border:1px solid #f5c6cb; }

.post-header{
    display:flex;
    align-items:center;
    gap:10px;
    padding:12px 14px;
}

.post-avatar{
    width:36px;
    height:36px;
    border-radius:50%;
    background:#ff914d;
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:bold;
    flex-shrink:0;
}

.post-meta{
    flex:1;
    min-width:0;
}

.post-meta .name{
    font-weight:bold;
    color:#333;
    font-size:14px;
}

.post-meta .sub{
    color:#999;
    font-size:12px;
    margin-top:2px;
}

.post-delete{
    border:none;
    background:transparent;
    color:#aaa;
    cursor:pointer;
    font-size:13px;
    padding:4px 6px;
}

.post-delete:hover{ color:#c0392b; }

.post-image{
    width:100%;
    aspect-ratio:1 / 1;
    object-fit:cover;
    display:block;
    background:#f3f3f3;
}

.post-actions{
    display:flex;
    gap:8px;
    padding:10px 12px 0;
}

.action-btn{
    border:none;
    background:transparent;
    cursor:pointer;
    font-size:22px;
    line-height:1;
    padding:4px 6px;
    color:#333;
}

.action-btn.liked{
    color:#e74c3c;
}

.post-body{
    padding:8px 14px 14px;
}

.like-count{
    font-size:14px;
    font-weight:bold;
    color:#333;
    margin-bottom:6px;
}

.caption{
    font-size:14px;
    color:#333;
    line-height:1.55;
    margin-bottom:10px;
}

.caption .author{
    font-weight:bold;
    margin-right:6px;
}

.comments{
    border-top:1px solid #f0f0f0;
    padding-top:8px;
    margin-top:4px;
}

.comment{
    font-size:13px;
    color:#444;
    line-height:1.45;
    margin-bottom:6px;
}

.comment .who{
    font-weight:bold;
    margin-right:6px;
}

.comment-form{
    display:flex;
    gap:8px;
    margin-top:10px;
}

.comment-form input{
    flex:1;
    border:none;
    border-top:1px solid #f0f0f0;
    padding:12px 0 0;
    font:inherit;
    font-size:13px;
    outline:none;
}

.comment-form button{
    border:none;
    background:transparent;
    color:#ff7b00;
    font-weight:bold;
    cursor:pointer;
    font-size:13px;
    padding-top:12px;
}

.comment-form button:disabled{
    color:#ccc;
    cursor:default;
}

.feed-empty{
    text-align:center;
    color:#888;
    padding:40px 10px;
}

.time-ago{
    color:#aaa;
    font-size:12px;
    margin-top:6px;
}
