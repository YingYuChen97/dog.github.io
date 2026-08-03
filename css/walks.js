.walk-list{ display:grid; gap:14px; }

.walk-card{
    border:1px solid #eee;
    border-radius:12px;
    padding:14px;
    display:grid;
    grid-template-columns:72px 1fr;
    gap:12px;
    align-items:start;
}

.walk-card img{
    width:72px;
    height:72px;
    object-fit:cover;
    border-radius:10px;
    background:#f3f3f3;
}

.walk-card h4{
    color:#ff914d;
    margin-bottom:4px;
    font-size:16px;
}

.walk-card p{
    color:#555;
    font-size:13px;
    line-height:1.5;
    margin-bottom:4px;
}

.walk-card .msg-text{
    background:#f8f9fa;
    border-radius:8px;
    padding:8px 10px;
    margin:8px 0;
    color:#444;
}

.status-pill{
    display:inline-block;
    font-size:12px;
    font-weight:bold;
    padding:3px 8px;
    border-radius:999px;
    margin-left:6px;
    vertical-align:middle;
}
.status-pending{ background:#fff4eb; color:#ff7b00; }
.status-accepted{ background:#e8f5e9; color:#2e7d32; }
.status-rejected{ background:#fce8e6; color:#c62828; }
.status-completed{ background:#e3f2fd; color:#1565c0; }
.status-cancelled{ background:#f1f3f5; color:#777; }

.walk-actions{
    display:flex;
    flex-wrap:wrap;
    gap:8px;
    margin-top:10px;
}

.rate-box{
    margin-top:10px;
    padding-top:10px;
    border-top:1px dashed #eee;
}

.rate-box label{
    display:block;
    font-size:13px;
    font-weight:bold;
    color:#555;
    margin-bottom:4px;
}

.rate-box select,
.rate-box input{
    width:100%;
    max-width:360px;
    padding:8px 10px;
    border:1px solid #ddd;
    border-radius:8px;
    font:inherit;
    margin-bottom:8px;
}

.stars{
    color:#f5a623;
    font-weight:bold;
}

.rating-summary{
    color:#666;
    font-size:14px;
    margin-top:6px;
}

.apply-box{
    margin-top:18px;
    padding-top:16px;
    border-top:1px solid #f0f0f0;
}

.apply-box h3{
    font-size:17px;
    color:#444;
    margin-bottom:8px;
}

.apply-box textarea,
.apply-box input{
    width:100%;
    padding:10px 12px;
    border:1px solid #ddd;
    border-radius:10px;
    font:inherit;
    margin-bottom:10px;
}

.apply-box textarea{ min-height:80px; resize:vertical; }

@media (max-width:640px){
    .walk-card{ grid-template-columns:1fr; }
    .walk-card img{ width:100%; height:160px; }
}
