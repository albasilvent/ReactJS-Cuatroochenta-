import { Button, Loader, Modal, Notification, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { lato_light } from "../../fonts";
import { useTranslations } from "next-intl";
import { RiContactsLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import FormData from "../../interfaces/FormData";

export default function ContactModal() {
    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const t = useTranslations("Page");

    const [formData, setFormData] = useState<FormData>({
        name: "",
        surname: "",
        birthdate: "",
        city: "",
        email: "",
        phone: "",
    });

    const [formErrors, setFormErrors] = useState({
        name: "",
        surname: "",
        birthdate: "",
        city: "",
        email: "",
        phone: "",
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (value.trim()) {
            setFormErrors({
                ...formErrors,
                [name]: "",
            });
        }
    };

    const validateForm = () => {
        let errors: any = {};
        let valid: boolean = true;

        if (!formData.name.trim()) {
            errors.name = t("required");
            valid = false;
        }
        if (!formData.surname.trim()) {
            errors.surname = t("required");
            valid = false;
        }
        if (!formData.birthdate.trim()) {
            errors.birthdate = t("required");
            valid = false;
        }
        if (!formData.city.trim()) {
            errors.city = t("required");
            valid = false;
        }
        if (!formData.email.trim()) {
            errors.email = t("required");
            valid = false;
        }
        if (!formData.phone.toString().trim()) {
            errors.phone = t("required");
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setShowNotification(true);
                setFormData({
                    name: "",
                    surname: "",
                    birthdate: "",
                    city: "",
                    email: "",
                    phone: "",
                });
                close();
            }, 2000);
        }
    };

    useEffect(() => {
        let timer: any;
        if (showNotification) {
            timer = setTimeout(() => {
                setShowNotification(false);
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [showNotification]);

    const handleModalClose = () => {
        setFormData({
            name: "",
            surname: "",
            birthdate: "",
            city: "",
            email: "",
            phone: "",
        });
        setFormErrors({
            name: "",
            surname: "",
            birthdate: "",
            city: "",
            email: "",
            phone: "",
        });
        close();
    };

    return (
        <>
            <Modal
                opened={opened}
                onClose={handleModalClose}
                title={t("contact")}
                size="xl"
            >
                <section style={{ position: "relative" }}>
                    {loading && (
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: "rgba(255, 255, 255, 0.7)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 1000,
                            }}
                        >
                            <Loader size="xl" />
                        </div>
                    )}
                    <form className="h-auto flex flex-col justify-center items-end gap-2">
                        <div className="w-full h-full p-3 flex flex-col rounded-md gap-5">
                            <div className="flex justify-between gap-5 w-full rounded-md">
                                <TextInput
                                    label={t("name")}
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    error={formErrors.name}
                                    placeholder={t("name")}
                                    className={`${lato_light.className} w-1/3`}
                                    required
                                />
                                <TextInput
                                    label={t("surname")}
                                    name="surname"
                                    value={formData.surname}
                                    onChange={handleInputChange}
                                    error={formErrors.surname}
                                    placeholder={t("surname")}
                                    className={`${lato_light.className} w-2/3`}
                                    required
                                />
                            </div>
                            <TextInput
                                label={t("birthdate")}
                                name="birthdate"
                                value={formData.birthdate}
                                onChange={handleInputChange}
                                error={formErrors.birthdate}
                                placeholder={t("birthdate")}
                                className={`${lato_light.className}`}
                                required
                            />
                            <TextInput
                                label={t("city")}
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                error={formErrors.city}
                                placeholder={t("city")}
                                className={`${lato_light.className}`}
                                required
                            />
                            <TextInput
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                error={formErrors.email}
                                placeholder="email@email.com"
                                className={`${lato_light.className}`}
                                required
                            />
                            <TextInput
                                label={t("phone")}
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                error={formErrors.phone}
                                placeholder="000000000"
                                className={`${lato_light.className}`}
                                required
                            />
                        </div>

                        <Button
                            size="md"
                            className="w-1 my-1 shadow-sm shadow-gray-500"
                            color={"rgba(68, 117, 179, 1)"}
                            type="submit"
                            onClick={handleSubmit}
                        >
                            {t("submit")}
                        </Button>
                    </form>
                </section>
            </Modal>

            <div
                className={`text-xl text-gray-500 ${lato_light.className} w-full mt-40 flex items-center gap-2 underline cursor-pointer`}
                onClick={open}
            >
                <RiContactsLine />
                <p> {t("contact")}</p>
            </div>

            {/* Display notification */}
            {showNotification && (
                <Notification
                    title={t("perfect")}
                    color="white"
                    onClose={() => setShowNotification(false)}
                    style={{ position: "absolute", top: -100, width: "20vw" }}
                >
                    {t("message-sent")}
                </Notification>
            )}
        </>
    );
}
