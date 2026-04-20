import React from "react";
import "../../StyleSheets/CompanyCard.css";

const CompanyCard = ({ company }) => {


    return (

        <div className="company-card">

            <div className="company-title">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAABiVBMVEX////5sR7jJScImUojbbQAAADhAAD5rQD5sBn82J35rgX///381Zf704//9+v5tzf/+vEAYa8AlkIAkzsAYK6ZkHoQarfjICIYabKLi4uTk5MAlD3iGx3iEhUAZLAkarnh4eFUVFR7e3v3y8v87OxycnLJycnu+PLn7vYFm0P/tQBJSUl6vpL2xMTujY3+9PTwm5zn9OyPrtPpYGHse3yazKxumMj0t7gEnEDxpKUAZ7zoVle83sj519f2xsarq6u6urrY2NhYsHg7pmTA0eapwN3a5PDqb3Agn1XI1+mCpc7Z7eGMxqDpXV4bfJU5ebqwxd/mRkf96MZOhL5mtoLNOCxjkcXI5NKs1bqlWjW+nF/kMTIpKSlgYGA3NzfseXoAW7jdqTr7zHyfkXf6wFYKjWhQeKIYgol0gpH7xWri0rX+79VOmVofdKUYg4YAhm6my8rIn1R1dj2wmGqQZzkxj0W9Ry9RhEOuqpKJeEvOtYkNkWCGq9cAfIMUiHked6FgfkB1kK7/xUx8uHcGAAAP1UlEQVR4nO2d+UPbRhbHDTaC2G1TH7WV+CLBwTaHDeY0RyCAwVwB45SQGMKWJj02m+22adPddrfd7V++GknzRrZHtuaJhkLn+0sgtmTp45n3vnoaPTweKSkpKSkpKSkpKSkpKSkpKSkpKSkpKak/owKBwFUfwnVVdmlsver1Vtf2nl71oVw/TY6FwiGvrlC4OpO96uO5Xtqj7CjBscmrPqTro8lq3NuiUHhNzmFnmgyFWunpANeXrvrIroOyPHgyCDrVuh0+TfG4DIKdNRO2p2cEwd2rPsSrVjEzXi4UCuWhYttLWUvWiIfj4XDbWPwzB8Hi8tzEVi2pKMlkIqn9sz/X8oY9wBXyzuxms0/Hwpw0fDlBMLe5USmVKoebl7Cv31sE3FSDgEvEekEJpTHe9DagF18zL9iyM6H2+RwPuQmCuc3DymzdpwZTKVVNpYK+nT8wwczyXGG/N0kGnAUcVUzZsrz3hJIKrVn/t8qbw4ggmNuulGYP1GBQw6b6mNTIcc71eV66MkPlwqIxUzngqJINFgKrlE64eXY+XXMXBDe3KzvHvkikBZsVYOXyztutipmH5fPFRMtMtVMC+D2FwTfWustdVBDUwltJm6bBCBlvXG6gyM7vQUJQxeVxLTc4BUf5LZpbr9EhFuZEtuweNwjucYNgbvuwdKxxa52mHZSa/R25dJWeVBt2Ia6zlAl9F7vcyMcU0IJgG8BQ+IklCJJsulM/MLKCM2xU0b+Ujm4hdPTaLbqhwlRvtxDXpJhmW5KWNysZspsxGHy29YGn6/ZBcLNUVyMIbrrS6ief9ff7EdK2unBBMFNICkxVDZyixGpb5fLEogIbJac9Vsu83uHjdp+0A/SGvScVn5YYBJlptsVgrUY/948M9GDl73+JBTihJAXA9S5Olx9mzFSxXEsAv6LFMoc7Z9Tsnrc1i+Rf+VKC3FKR1EF9tlTZOUj5ol/cHkGz0zXQfwsDr1hTuoPTLzBi+9PloUzL5ouUnzJnsczebrc4Ai1OcP7LtMOBp3ELatyOdyobYJUPF75yMfKo+r8Wp5fpTXTiFjPATRXmltsvb3X6dPPENLPM8RkHn7xkCYLzj9PdsakpzfYdzJYOt9sc8l/73dPT+L0UpVfstQt5+kxNNrYm7MCZmjBnfqzGLHPc2f01CILa2OvALaVdlaV89Z3SxqbNlcXr/kuAR/hdCOJb5Iw9mhu6gTO0TOd+soNlttOk7gRD3/DokeEWDKrGNO14RRbouYyxp/M7cnrkuspKO7jE4nl5POMAnCmad5J/gywqUAzQnWArt2g6GPTVudOUpw/9DMAAwrgw+AM9zo9cm7qWlEum6qIlNzi+v10zp/+n+c6W2VZLX0YZunTa9+bx37/5h8D2HzN6/pFv334gqoseNveF0u8E4EskC05mKk9bxvyPfQeDT/SWGsu56V9feefn86F8XqAceAvwjbxVF6KCH050BANw4LbAZg2aN5L7SHYe+A4aYEI6WWaeNoIw9l7Nh8R3cpue+8idBdUXxBSuPoLo2e/cPUPUhyt+jMb1vcS+h8EnWomfpaMv/SoP30H4xOnmH9Gp53+7oO0kuC348bogd/udz94yRP1WMywi40uIwYlXRXcAY2+n6XLYafA9omc+oH8NqUPRz9f1tTn8Bpx75+kEOF43Ivhiz+jAcWSZmxQx8WnTbnc9Ljz8aOgb+HZBx1cS/Xxd9EsY+M3xJlMmvuR49/d2EImgiR/oaYdE7wFtUnw+8ttYl5JXu6ht8X+uJ3AVV/SjIUAgdyyamUNZRn0iFUm978C1OLbMVIDvQP8VCq5xh98D4PvEwFcXPQBdCHz7FN8Q6hOpCsnexI8Yy2yoefR5Junwc+p/WvCZuxEVAt8Wnbxl1CdSzSl4y6wpR/GljN/pGo+4w+DXii8ofARECHzUNbtMHctKgllmxAIM6lsihmOjFWunOagVXwR1yxeBb44WS9zYPu3ST8FbZqK6yS9lODZacw0h8aU2EMeAwUdtc6zhbgF3A2+ZiahtThk3ap+4nLwp1P1eBD6oGCj4SzaiKbxlJipRfIZjqwp+Fa34VNTtXgQ+uOZ1mXr/CV5D2DITHZo3OdRj8tsSZF6HObwNH8q5YPDt09TbukxKTFBlDqGCwDYtGejGb110JLcZF5RzweArmLM3WcB8IhWMl9C/UNvnrMZvV7hk3YYvgjkIDD6aehNTmE+kYotxk7gYSp1LKmdd5eHUArXjQ5WsEPgg9fYiPpAKxov3O+TV3wGtGWyyaw7nFqgNH6pkhcGXUS4h9VKj4c1/quBi6DFNvYeWVR6OLVAbPpRzweDz0Gqzi6IBGy8/JpExdAeMXwDqVc4tUDs+TMkKhY/WXFykXliYkX8XS2x1fz9HFepcZmcoPufFZobvbdRqgASFwldIuE29AcgbPyTIrXKM6M0OtY6xQIDvpyYDJCgUPlquRw4bTTBe8s9i2Bi6SfE9hsLNnvOtAd8tik9FHAMK35Dr1AvjxRtDx9CcGfvSP9N9hQVK1gwftc2Ym20ofK5TL1hm7/c6PlzZ33Au6pt5OvieCGzM8FkMkLBQ+GCFBTb1wiWWt6HH0AnUXoySVfobYctMxPBZDJCwcPhq7lKvxTInXMRQs2QFg0+oZM3w/bu5dCMkHD56rxI5bCyW2YihuNSrO5f0L90XRvPE8DEDJH4IOHzuUq/FMptfg4LZjVGyUmGJgVjVkOHbBgMkfgg4fA9p6kUNG6tlNvGh1isQ5xL9kuITsMxEgO+DTVgsI34IOHyQehOY1AuJo0pjqPIQsRtPTht9aWzVkI0+D11cnhJ3Ljh8LPUihk0W1jKfnLuLoapmmWniiAtYZiILPhfOBYkPhg3CsUHejbu953mAtMxEbPKye3biN9uQ+NzcKqeeWTMa465iqGc2+iu4FtFVHhZ8O8337ESExAfD5lz4Ez0ncThjtkBcfDeaSguvUJaZyIIPnIv4zTYkPjfDhj7HQa6x4OoPlXorSMtMZMG30XTPTkhIfJB6e8VTLzyJUHV7z3MbaZmJLPg28SUrJL6ii9RrXQzlbrlRDvy3+I12C74cdS7iJSskPpZ6EcPGy07aXeqdgcEnZpmJLPhgna94yQqLz82wgRs7obVxV8uN4Hvwijs2K746xSd8sw2Lz82wgeDnDdGLXlThFZ4lzP9HvNZkxTeLLllh8blapcZqzV64aYdIvXDxl1fFa01WfCWaeoV3g8UHjg0zbNjwM8qluBjKniX8JS3u2Kz4DtElKyw+d6vUWMHvHfXN4oVXWJiRf4OoNVnxbdPUK+xcsPjcObYATN9n5m4Swvc8wf+EXqURtSYrvhw1finRvaDxTblapQadIr8z8cXeVQXNB+Tv+V9VRK3Jig9KVsLLhND46Co18WGjK1s1zv6/9MHqd/l4fE+gagJlL+/PaUytqQkfLVkJrw9H44NVavuCG5oKGI/Us9GX1zvlOr7yB8ucf6xiak1N+OjNNmHjh8YHqTcmuCFI72xDY1/smRHHHHfKZU8BkkfyVeFaUxO++nvHV7yEVWq7T0LU/sCTqaGwoyB4Aqs89IfKxWtNTfjU9z55PdCJxc2jbTSCWp7PIu29ujeJtFhmXK2Ja1yEF+ji8V3CKjXPBOsp4bUq3q1duNUy4xybFd8BHX3vz/ddwgLx5SmgZ4Y+pi5BECzz/AGy1mTBNwsFK+EQgMdXdrFAXG8v2VBYN5gktz+abRDcbbLMqFoTwTcw4B8Z+akOXbDEn2vD44NVag2RrTIPy9O1mN4l0dKIKDk9yWkS6Q17bYJgk2XG5cwPR0Z6Pnv++Z03C9CRA3Hph8cnukpteXzivKZw20vGiPkJzHh5PQ55QZBZ5nVUrYm0mPzfF+rCQjQatbQQi4ivrX+NxsdSb5clAkbPZj645uS9xO1x2B4EYW1qfIk+2easWKJx2zk+ID3B1Ghb6zVME07oiCDcBgyeKrcv+ZHWw1O11p7N7fTYvXabTrnNQZAtpPdCranzVa/ZmjMV7NAJVkUscYE2WP4PhbeFZkJKe8E+s0xyg6OGponmmo2DIAjlrtAMK5bwA1du85B00E3prTk7t/pDrHDxXNBORIJNwIhYxVSxLFHRkuq00V091g2cPnSVWmudmd8uHIJg4AnrOhJgV/st/Eija22aatictTRVfW7o9fg/Ft+6BnyStbnlYsY+N9ixSygNruk+4QfBpcns7oyXdbcnCzMqYDvUVGnTnKak0bXzzsOkhdjxx6J6fauH0RPt4Ec0zq4ZYtp4EwNH2kvWpm1rrfwgGG76SwrGo7uW3qVqhHTYFMBmKLpw8HykX1iWDnT9HyHwcbsgOgCngW5s2fblpOK1C2+ez8aStEqwOyDbUac5l4XoV8/9llZ+CKEGn3Wphgi4iXGHRYbsTLzD30AJVc31kHXBwaZzIx10I74vvvrk+WcDI+7gadkX2dRh3BG/mNFeskZaDwt+AO9vJtDBB37a55wftOYsVbZznt9GRqxNILH0/KipSzSndIx2RohrLHJaDzsVLwjq9FhdOueAn/73OVKtrTlfuhx3Bj0XrcMfJvnxzwQ3VZhDg6Pi/s2EqvVaLle3731tbdhs8SbmdLtw3XrY34Mee0SZKSXBA6fnhkv6S53ZvVATQO1KuGXPpUgbQLNhs8atUyfYI78rgP7+C7fnOLRv1E9iFNzEnLveajxpQTAeovaFU0bI7RCDDFlBC2/aNO3ceNhQ4FaPZkFQ8vv7v3Y19Exl5s5rjd5G7dxxUkVod2Zt3eutro8t2XzfGztkpdRBvWvD5la9/uDlbfGBd/u3iyPEtcYNVUBUV33A116SoJSUlJSUlJSU1PvWg3umRoe5r6+Mnvadnq3yN14dHV0x3zVq85bhM2178103UH2gVc6rw/TFUW6F/05f3339hwd9fXe5ux+lO+B/OddeZ6Oa7mnnd4/z4iNy4vfvkJdPeRt3xXeqbXl298EN5kdEBtkg5//JydPX73Ne74bvPt3vC+2HyznUP6K0k+NFpxU46RX+6XfBV4SQMGgTHG6EtJMf5f3/WV/fA+OnIn/2afgeFAcHB4t8fKsMOtvVjdOqzdQlU44OSv74vMMSDw/f3b6+F+yd3G/oBshm6jbhO0XiG2U/vmh/w03Qme3A0FzHHfNHfuzS8N1bIRrl4lthCfu+mYRunGynrk7HPH2b1NwldRDf88j4kT88r7+KtlPXOH3jpEf5I7SbcTmlm921/46ut7Spezqsi/Mi8bsPHg0Oj7Jh1KRu+MigfTE8+Ij4vzuc16+9Vljs5/GBay6+a+t61cF2fzNtyxnDN8h7/a7x2j0eWyfXvMPGF3B6Q2sGxPSasnnHo9XVYbvXPHSrou3mnsHV1VXbF6WkpKSkpKSkpKSkpKSkpKSkpKSkpKSkbqT+D+DuTlf5SXtGAAAAAElFTkSuQmCC" alt="Hello" />
                <h3>Zoho</h3>
                <p className="company-view-type"> IT</p>
            </div>
 <h3>Key Info</h3>
            <div className="company-info">
                {/* <h3>Key Info</h3> */}
                <div className="company-info-item">
                    <p className="company-info-label">CTC</p>
                    <p className="company-info-value">10 LPA</p>
                </div>

                <div className="company-info-item">
                    <p className="company-info-label">Location</p>
                    <p className="company-info-value">Chennai</p>
                </div>

                <div className="company-info-item">
                    <p className="company-info-label">Branches</p>
                    <p className="company-info-value">CSE</p>
                </div>

                
            </div>


            <div className="view-Details">
                <button className="view-details-button">View Details</button>
            </div>
        </div>



    )
}
export default CompanyCard;